"use server";

import { revalidatePath } from "next/cache";
import {
  questionsForScope,
  scoreAnswers,
  type ChoiceLetter,
  type PhaseId,
} from "@/content/andragogy/checks";
import {
  getDiagnosticQuestions,
  scoreDiagnostic,
  type PhaseId as DiagnosticPhaseId,
} from "@/content/andragogy/diagnostics";
import { requireSession } from "@/lib/auth";
import {
  earnAchievement,
  saveDiagnosticAttempt,
  saveQuizAttempt,
  setGateItem,
  syncAchievementsFromProgress,
} from "@/lib/andragogy/learning";
import {
  setDayCompleted,
  upsertDayNote,
} from "@/lib/andragogy/progress";
import { ACHIEVEMENTS } from "@/content/andragogy/achievements";

export type ActionResult =
  | { ok: true; message?: string }
  | { ok: false; error: string };

function revalidateAndragogy() {
  revalidatePath("/programs/andragogy");
  revalidatePath("/programs/andragogy", "layout");
}

export async function toggleAndragogyDayAction(formData: FormData) {
  const session = await requireSession();
  const week = Number(formData.get("week"));
  const day = Number(formData.get("day"));
  const completed = String(formData.get("completed")) === "1";
  if (!week || !day) return;
  await setDayCompleted(session.id, week, day, completed);
  await syncAchievementsFromProgress(session.id);
  revalidateAndragogy();
}

export async function saveAndragogyNoteAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const session = await requireSession();
    const week = Number(formData.get("week"));
    const day = Number(formData.get("day"));
    const body = String(formData.get("body") ?? "");
    if (!week || !day) return { ok: false, error: "Invalid lesson." };
    await upsertDayNote(session.id, week, day, body);
    revalidateAndragogy();
    return { ok: true, message: "Saved." };
  } catch {
    return { ok: false, error: "Could not save note." };
  }
}

export async function submitQuizAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const session = await requireSession();
    const scopeRaw = String(formData.get("scope") ?? "all");
    const scope =
      scopeRaw === "all"
        ? "all"
        : (Number(scopeRaw.replace("phase-", "")) as PhaseId);
    const questions = questionsForScope(scope);
    const answers: Record<string, ChoiceLetter> = {};
    for (const question of questions) {
      const value = String(formData.get(`answer_${question.id}`) ?? "");
      if (value === "A" || value === "B" || value === "C" || value === "D") {
        answers[question.id] = value;
      }
    }
    const result = scoreAnswers(answers, questions);
    const scopeKey = scope === "all" ? "all" : `phase-${scope}`;
    await saveQuizAttempt(session.id, scopeKey, result.percentage, answers);
    await syncAchievementsFromProgress(session.id);
    revalidateAndragogy();
    return {
      ok: true,
      message: `Score ${result.percentage}% (${result.correct}/${result.total}). ${
        scope === "all"
          ? result.passedExpertGate
            ? "Expert threshold met."
            : "Need ≥85% for expert threshold."
          : result.passedPhaseGate
            ? "Phase gate threshold met."
            : "Need ≥80% for phase gate."
      }`,
    };
  } catch (err) {
    console.error(err);
    return { ok: false, error: "Could not score quiz." };
  }
}

export async function submitDiagnosticAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const session = await requireSession();
    const phase = Number(formData.get("phase")) as DiagnosticPhaseId;
    const kind = String(formData.get("kind")) as "baseline" | "reassessment";
    if (![1, 2, 3, 4].includes(phase) || (kind !== "baseline" && kind !== "reassessment")) {
      return { ok: false, error: "Invalid diagnostic." };
    }
    const questions = getDiagnosticQuestions(phase, kind);
    const answers: Record<string, string> = {};
    for (const question of questions) {
      answers[question.id] = String(formData.get(`answer_${question.id}`) ?? "");
    }
    const score = scoreDiagnostic(questions, answers);
    await saveDiagnosticAttempt({
      userId: session.id,
      phase,
      attemptKind: kind,
      scorePct: score.scorePct,
      answers,
      skillScores: score.skillScores,
    });

    for (const skillId of score.masteredSkillIds) {
      const achievement = ACHIEVEMENTS.find((item) => item.skillId === skillId);
      if (achievement) {
        await earnAchievement({
          userId: session.id,
          achievementId: achievement.id,
          sourceType: "diagnostic",
          sourceRef: skillId,
        });
      }
    }
    await syncAchievementsFromProgress(session.id);
    revalidateAndragogy();
    return {
      ok: true,
      message: `Diagnostic score ${score.scorePct}%. Mastered skills: ${
        score.masteredSkillIds.join(", ") || "none yet"
      }.`,
    };
  } catch (err) {
    console.error(err);
    return { ok: false, error: "Could not score diagnostic." };
  }
}

export async function toggleGateItemAction(formData: FormData) {
  const session = await requireSession();
  const phase = Number(formData.get("phase"));
  const itemKey = String(formData.get("itemKey") ?? "");
  const done = String(formData.get("done")) === "1";
  if (!phase || !itemKey) return;
  await setGateItem(session.id, phase, itemKey, done);
  await syncAchievementsFromProgress(session.id);
  revalidateAndragogy();
}
