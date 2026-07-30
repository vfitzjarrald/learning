import { randomUUID } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { hasRemoteDatabase } from "@/lib/env";

export type AndragogyProgressRow = {
  user_id: string;
  week: number;
  day: number;
  completed: boolean;
  completed_at: string | null;
};

export type AndragogyNoteRow = {
  user_id: string;
  week: number;
  day: number;
  body: string;
  updated_at: string;
};

export type AndragogyQuizRow = {
  id: string;
  user_id: string;
  scope: string;
  score_pct: number;
  answers: Record<string, string>;
  created_at: string;
};

export type AndragogyGateRow = {
  user_id: string;
  phase: number;
  item_key: string;
  done: boolean;
  updated_at: string;
};

export type AndragogyDiagnosticRow = {
  id: string;
  user_id: string;
  phase: number;
  attempt_kind: "baseline" | "reassessment";
  score_pct: number;
  answers: Record<string, string>;
  skill_scores: Array<{
    skillId: string;
    correct: number;
    total: number;
    scorePct: number;
    mastered: boolean;
  }>;
  created_at: string;
};

export type AndragogyAchievementRow = {
  id: string;
  user_id: string;
  achievement_id: string;
  source_type: string;
  source_ref: string | null;
  earned_at: string;
};

type AndragogyStore = {
  progress: AndragogyProgressRow[];
  notes: AndragogyNoteRow[];
  quiz_attempts: AndragogyQuizRow[];
  gate_items: AndragogyGateRow[];
  diagnostic_attempts: AndragogyDiagnosticRow[];
  achievements: AndragogyAchievementRow[];
};

function storePath() {
  return path.join(process.cwd(), "data", "andragogy-store.json");
}

function emptyStore(): AndragogyStore {
  return {
    progress: [],
    notes: [],
    quiz_attempts: [],
    gate_items: [],
    diagnostic_attempts: [],
    achievements: [],
  };
}

function readStore(): AndragogyStore {
  const file = storePath();
  if (!existsSync(file)) return emptyStore();
  const data = JSON.parse(readFileSync(file, "utf8")) as Partial<AndragogyStore>;
  return {
    progress: data.progress ?? [],
    notes: data.notes ?? [],
    quiz_attempts: data.quiz_attempts ?? [],
    gate_items: data.gate_items ?? [],
    diagnostic_attempts: data.diagnostic_attempts ?? [],
    achievements: data.achievements ?? [],
  };
}

function writeStore(data: AndragogyStore) {
  const dir = path.dirname(storePath());
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(storePath(), JSON.stringify(data, null, 2), "utf8");
}

export function isAndragogyLocalMode() {
  return !hasRemoteDatabase();
}

export function localGetProgressMap(userId: string) {
  const map = new Map<string, { completed: boolean; completedAt: string | null }>();
  for (const row of readStore().progress.filter((item) => item.user_id === userId)) {
    map.set(`${row.week}-${row.day}`, {
      completed: row.completed,
      completedAt: row.completed_at,
    });
  }
  return map;
}

export function localGetDayProgress(userId: string, week: number, day: number) {
  const row = readStore().progress.find(
    (item) => item.user_id === userId && item.week === week && item.day === day,
  );
  return {
    completed: row?.completed ?? false,
    completedAt: row?.completed_at ?? null,
  };
}

export function localSetDayCompleted(
  userId: string,
  week: number,
  day: number,
  completed: boolean,
) {
  const data = readStore();
  const existing = data.progress.find(
    (item) => item.user_id === userId && item.week === week && item.day === day,
  );
  if (existing) {
    existing.completed = completed;
    existing.completed_at = completed ? new Date().toISOString() : null;
  } else {
    data.progress.push({
      user_id: userId,
      week,
      day,
      completed,
      completed_at: completed ? new Date().toISOString() : null,
    });
  }
  writeStore(data);
}

export function localGetDayNote(userId: string, week: number, day: number) {
  return (
    readStore().notes.find(
      (item) => item.user_id === userId && item.week === week && item.day === day,
    ) ?? null
  );
}

export function localUpsertDayNote(
  userId: string,
  week: number,
  day: number,
  body: string,
) {
  const data = readStore();
  const existing = data.notes.find(
    (item) => item.user_id === userId && item.week === week && item.day === day,
  );
  const updatedAt = new Date().toISOString();
  if (existing) {
    existing.body = body;
    existing.updated_at = updatedAt;
  } else {
    data.notes.push({
      user_id: userId,
      week,
      day,
      body,
      updated_at: updatedAt,
    });
  }
  writeStore(data);
}

export function localSaveQuizAttempt(
  userId: string,
  scope: string,
  scorePct: number,
  answers: Record<string, string>,
) {
  const data = readStore();
  const row: AndragogyQuizRow = {
    id: randomUUID(),
    user_id: userId,
    scope,
    score_pct: scorePct,
    answers,
    created_at: new Date().toISOString(),
  };
  data.quiz_attempts.push(row);
  writeStore(data);
  return row;
}

export function localGetBestQuizScores(userId: string) {
  const map = new Map<string, number>();
  for (const row of readStore().quiz_attempts.filter((item) => item.user_id === userId)) {
    const prev = map.get(row.scope) ?? 0;
    if (row.score_pct > prev) map.set(row.scope, row.score_pct);
  }
  return map;
}

export function localGetGateStates(userId: string) {
  const map = new Map<string, boolean>();
  for (const row of readStore().gate_items.filter((item) => item.user_id === userId)) {
    map.set(`${row.phase}:${row.item_key}`, row.done);
  }
  return map;
}

export function localSetGateItem(
  userId: string,
  phase: number,
  itemKey: string,
  done: boolean,
) {
  const data = readStore();
  const existing = data.gate_items.find(
    (item) =>
      item.user_id === userId && item.phase === phase && item.item_key === itemKey,
  );
  if (existing) {
    existing.done = done;
    existing.updated_at = new Date().toISOString();
  } else {
    data.gate_items.push({
      user_id: userId,
      phase,
      item_key: itemKey,
      done,
      updated_at: new Date().toISOString(),
    });
  }
  writeStore(data);
}

export function localSaveDiagnosticAttempt(input: {
  userId: string;
  phase: number;
  attemptKind: "baseline" | "reassessment";
  scorePct: number;
  answers: Record<string, string>;
  skillScores: AndragogyDiagnosticRow["skill_scores"];
}) {
  const data = readStore();
  const row: AndragogyDiagnosticRow = {
    id: randomUUID(),
    user_id: input.userId,
    phase: input.phase,
    attempt_kind: input.attemptKind,
    score_pct: input.scorePct,
    answers: input.answers,
    skill_scores: input.skillScores,
    created_at: new Date().toISOString(),
  };
  data.diagnostic_attempts.push(row);
  writeStore(data);
  return row;
}

export function localListDiagnosticAttempts(userId: string, phase?: number) {
  return readStore()
    .diagnostic_attempts.filter(
      (item) =>
        item.user_id === userId && (phase == null || item.phase === phase),
    )
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export function localListAchievements(userId: string) {
  return readStore().achievements.filter((item) => item.user_id === userId);
}

export function localEarnAchievement(input: {
  userId: string;
  achievementId: string;
  sourceType: string;
  sourceRef?: string | null;
}) {
  const data = readStore();
  if (
    data.achievements.some(
      (item) =>
        item.user_id === input.userId &&
        item.achievement_id === input.achievementId,
    )
  ) {
    return null;
  }
  const row: AndragogyAchievementRow = {
    id: randomUUID(),
    user_id: input.userId,
    achievement_id: input.achievementId,
    source_type: input.sourceType,
    source_ref: input.sourceRef ?? null,
    earned_at: new Date().toISOString(),
  };
  data.achievements.push(row);
  writeStore(data);
  return row;
}
