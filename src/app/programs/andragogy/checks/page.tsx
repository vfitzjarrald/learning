import Link from "next/link";
import { redirect } from "next/navigation";
import { CourseChrome } from "@/components/andragogy/CourseChrome";
import { QuizForm } from "@/components/andragogy/Interactive";
import {
  EXPERT_THRESHOLD,
  PHASE_GATE_THRESHOLD,
  questionsForScope,
  type PhaseId,
} from "@/content/andragogy/checks";
import { PHASES } from "@/content/andragogy/curriculum";
import { getSession } from "@/lib/auth";
import { getBestQuizScores } from "@/lib/andragogy/learning";

export const dynamic = "force-dynamic";

export default async function AndragogyChecksPage({
  searchParams,
}: {
  searchParams: Promise<{ scope?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login?next=/programs/andragogy/checks");

  const params = await searchParams;
  const scopeRaw = params.scope ?? "phase-1";
  const scope: "all" | PhaseId =
    scopeRaw === "all"
      ? "all"
      : ((Number(scopeRaw.replace("phase-", "")) || 1) as PhaseId);
  const questions = questionsForScope(scope).map((question) => ({
    ...question,
    choices: question.choices.map(({ letter, text }) => ({ letter, text })),
  }));
  const best = await getBestQuizScores(session.id);
  const scopeKey = scope === "all" ? "all" : `phase-${scope}`;
  const bestScore = best.get(scopeKey) ?? null;
  const threshold = scope === "all" ? EXPERT_THRESHOLD : PHASE_GATE_THRESHOLD;

  return (
    <CourseChrome session={session} active="checks">
      <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-tight text-foreground">
        Knowledge checks
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Phase gates need ≥{PHASE_GATE_THRESHOLD}%. Expert checkpoint needs ≥
        {EXPERT_THRESHOLD}% across all phases.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {PHASES.map((phase) => (
          <Link
            key={phase.id}
            href={`/programs/andragogy/checks?scope=phase-${phase.id}`}
            className={
              scope === phase.id
                ? "border border-accent bg-accent-soft px-3 py-1.5 text-sm text-accent"
                : "border border-line px-3 py-1.5 text-sm text-muted hover:border-accent hover:text-accent"
            }
          >
            Phase {phase.id}
          </Link>
        ))}
        <Link
          href="/programs/andragogy/checks?scope=all"
          className={
            scope === "all"
              ? "border border-accent bg-accent-soft px-3 py-1.5 text-sm text-accent"
              : "border border-line px-3 py-1.5 text-sm text-muted hover:border-accent hover:text-accent"
          }
        >
          Expert (all)
        </Link>
      </div>

      <p className="mt-6 text-sm text-muted">
        Best score for this scope:{" "}
        <span className="text-foreground">
          {bestScore != null ? `${bestScore}%` : "not attempted"}
        </span>{" "}
        · threshold {threshold}%
      </p>

      <div className="mt-8">
        <QuizForm scope={scopeKey} questions={questions} />
      </div>
    </CourseChrome>
  );
}
