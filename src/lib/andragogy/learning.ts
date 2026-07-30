import { getDb } from "@/lib/db";
import { ACHIEVEMENTS } from "@/content/andragogy/achievements";
import { PHASE_GATES } from "@/content/andragogy/gates";
import {
  isAndragogyLocalMode,
  localEarnAchievement,
  localGetBestQuizScores,
  localGetGateStates,
  localListAchievements,
  localListDiagnosticAttempts,
  localSaveDiagnosticAttempt,
  localSaveQuizAttempt,
  localSetGateItem,
  type AndragogyDiagnosticRow,
} from "./store";
import type { ProgressEntry } from "./progress";

export async function saveQuizAttempt(
  userId: string,
  scope: string,
  scorePct: number,
  answers: Record<string, string>,
) {
  if (isAndragogyLocalMode()) {
    return localSaveQuizAttempt(userId, scope, scorePct, answers);
  }
  const sql = getDb();
  const rows = await sql`
    INSERT INTO andragogy_quiz_attempts (user_id, scope, score_pct, answers)
    VALUES (${userId}, ${scope}, ${scorePct}, ${JSON.stringify(answers)}::jsonb)
    RETURNING id, user_id, scope, score_pct, answers, created_at::text
  `;
  return rows[0];
}

export async function getBestQuizScores(userId: string) {
  if (isAndragogyLocalMode()) return localGetBestQuizScores(userId);
  const sql = getDb();
  const rows = await sql`
    SELECT scope, MAX(score_pct) AS best
    FROM andragogy_quiz_attempts
    WHERE user_id = ${userId}
    GROUP BY scope
  `;
  const map = new Map<string, number>();
  for (const row of rows as Array<{ scope: string; best: number }>) {
    map.set(row.scope, Number(row.best));
  }
  return map;
}

export async function getGateStates(userId: string) {
  if (isAndragogyLocalMode()) return localGetGateStates(userId);
  const sql = getDb();
  const rows = await sql`
    SELECT phase, item_key, done
    FROM andragogy_gate_items
    WHERE user_id = ${userId}
  `;
  const map = new Map<string, boolean>();
  for (const row of rows as Array<{
    phase: number;
    item_key: string;
    done: boolean;
  }>) {
    map.set(`${row.phase}:${row.item_key}`, row.done);
  }
  return map;
}

export async function setGateItem(
  userId: string,
  phase: number,
  itemKey: string,
  done: boolean,
) {
  if (isAndragogyLocalMode()) {
    localSetGateItem(userId, phase, itemKey, done);
    return;
  }
  const sql = getDb();
  await sql`
    INSERT INTO andragogy_gate_items (user_id, phase, item_key, done, updated_at)
    VALUES (${userId}, ${phase}, ${itemKey}, ${done}, NOW())
    ON CONFLICT (user_id, phase, item_key)
    DO UPDATE SET done = EXCLUDED.done, updated_at = NOW()
  `;
}

export async function saveDiagnosticAttempt(input: {
  userId: string;
  phase: number;
  attemptKind: "baseline" | "reassessment";
  scorePct: number;
  answers: Record<string, string>;
  skillScores: AndragogyDiagnosticRow["skill_scores"];
}) {
  if (isAndragogyLocalMode()) return localSaveDiagnosticAttempt(input);
  const sql = getDb();
  const rows = await sql`
    INSERT INTO andragogy_diagnostic_attempts (
      user_id, phase, attempt_kind, score_pct, answers, skill_scores
    )
    VALUES (
      ${input.userId},
      ${input.phase},
      ${input.attemptKind},
      ${input.scorePct},
      ${JSON.stringify(input.answers)}::jsonb,
      ${JSON.stringify(input.skillScores)}::jsonb
    )
    RETURNING id, created_at::text
  `;
  return rows[0];
}

export async function listDiagnosticAttempts(userId: string, phase?: number) {
  if (isAndragogyLocalMode()) return localListDiagnosticAttempts(userId, phase);
  const sql = getDb();
  if (phase == null) {
    const rows = await sql`
      SELECT id, user_id, phase, attempt_kind, score_pct, answers, skill_scores, created_at::text
      FROM andragogy_diagnostic_attempts
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;
    return rows as AndragogyDiagnosticRow[];
  }
  const rows = await sql`
    SELECT id, user_id, phase, attempt_kind, score_pct, answers, skill_scores, created_at::text
    FROM andragogy_diagnostic_attempts
    WHERE user_id = ${userId} AND phase = ${phase}
    ORDER BY created_at DESC
  `;
  return rows as AndragogyDiagnosticRow[];
}

export async function listEarnedAchievements(userId: string) {
  if (isAndragogyLocalMode()) return localListAchievements(userId);
  const sql = getDb();
  const rows = await sql`
    SELECT id, user_id, achievement_id, source_type, source_ref, earned_at::text
    FROM andragogy_achievements
    WHERE user_id = ${userId}
  `;
  return rows as Array<{
    id: string;
    user_id: string;
    achievement_id: string;
    source_type: string;
    source_ref: string | null;
    earned_at: string;
  }>;
}

export async function earnAchievement(input: {
  userId: string;
  achievementId: string;
  sourceType: string;
  sourceRef?: string | null;
}) {
  if (isAndragogyLocalMode()) return localEarnAchievement(input);
  const sql = getDb();
  const existing = await sql`
    SELECT id FROM andragogy_achievements
    WHERE user_id = ${input.userId} AND achievement_id = ${input.achievementId}
    LIMIT 1
  `;
  if (existing.length) return null;
  const rows = await sql`
    INSERT INTO andragogy_achievements (user_id, achievement_id, source_type, source_ref)
    VALUES (
      ${input.userId},
      ${input.achievementId},
      ${input.sourceType},
      ${input.sourceRef ?? null}
    )
    RETURNING id, earned_at::text
  `;
  return rows[0];
}

export function evaluatePhaseGateProgress(input: {
  phase: number;
  progress: Map<string, ProgressEntry>;
  gateStates: Map<string, boolean>;
  quizBest: Map<string, number>;
}) {
  const gate = PHASE_GATES[input.phase as 1 | 2 | 3 | 4];
  if (!gate) return null;

  const weekStart = (input.phase - 1) * 4 + 1;
  const weekEnd = input.phase * 4;
  let lessonsDone = 0;
  let lessonsTotal = 0;
  for (let week = weekStart; week <= weekEnd; week++) {
    for (let day = 1; day <= 5; day++) {
      lessonsTotal += 1;
      if (input.progress.get(`${week}-${day}`)?.completed) lessonsDone += 1;
    }
  }

  const items = gate.items.map((item) => ({
    key: item.key,
    label: item.label,
    done: input.gateStates.get(`${input.phase}:${item.key}`) ?? false,
  }));
  const checklistDone = items.filter((item) => item.done).length;
  const quizScore = input.quizBest.get(`phase-${input.phase}`) ?? null;
  const quizMet = quizScore != null && quizScore >= 80;

  return {
    phase: input.phase,
    week: gate.week,
    items,
    checklistDone,
    checklistTotal: items.length,
    checklistComplete: checklistDone === items.length,
    lessonsDone,
    lessonsTotal,
    lessonsComplete: lessonsDone === lessonsTotal,
    quizScore,
    quizMet,
    quizScope: `phase-${input.phase}` as const,
    threshold: 80,
    readyToUnlock:
      lessonsDone === lessonsTotal && checklistDone === items.length && quizMet,
  };
}

export async function syncAchievementsFromProgress(userId: string) {
  const [progress, quizBest, earned, diagnostics] = await Promise.all([
    (await import("./progress")).getProgressMap(userId),
    getBestQuizScores(userId),
    listEarnedAchievements(userId),
    listDiagnosticAttempts(userId),
  ]);
  const earnedIds = new Set(earned.map((item) => item.achievement_id));
  const masteredSkills = new Set<string>();
  for (const attempt of diagnostics) {
    for (const skill of attempt.skill_scores) {
      if (skill.mastered) masteredSkills.add(skill.skillId);
    }
  }

  for (const achievement of ACHIEVEMENTS) {
    if (earnedIds.has(achievement.id)) continue;
    let shouldEarn = false;
    let sourceType = "progress";
    let sourceRef: string | null = null;

    if (achievement.category === "skill" && achievement.skillId) {
      if (masteredSkills.has(achievement.skillId)) {
        shouldEarn = true;
        sourceType = "diagnostic";
        sourceRef = achievement.skillId;
      } else {
        const weekComplete = [1, 2, 3, 4, 5].every(
          (day) => progress.get(`${achievement.week}-${day}`)?.completed,
        );
        if (weekComplete) {
          shouldEarn = true;
          sourceType = "week";
          sourceRef = `week-${achievement.week}`;
        }
      }
    }

    if (achievement.category === "gate") {
      const gateStates = await getGateStates(userId);
      const gateProgress = evaluatePhaseGateProgress({
        phase: achievement.phase,
        progress,
        gateStates,
        quizBest,
      });
      if (gateProgress?.readyToUnlock) {
        shouldEarn = true;
        sourceType = "gate";
        sourceRef = `phase-${achievement.phase}`;
      }
    }

    if (achievement.category === "expert") {
      const allBest = quizBest.get("all") ?? 0;
      const required = ACHIEVEMENTS.filter(
        (item) => item.requiredForExpert && item.category !== "expert",
      );
      const haveRequired = required.every((item) => earnedIds.has(item.id));
      if (haveRequired && allBest >= 85) {
        shouldEarn = true;
        sourceType = "expert";
        sourceRef = "all";
      }
    }

    if (shouldEarn) {
      await earnAchievement({
        userId,
        achievementId: achievement.id,
        sourceType,
        sourceRef,
      });
      earnedIds.add(achievement.id);
    }
  }
}
