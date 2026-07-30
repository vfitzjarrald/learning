import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CourseChrome } from "@/components/andragogy/CourseChrome";
import { DiagnosticForm } from "@/components/andragogy/Interactive";
import {
  getDiagnosticPhase,
  publicDiagnosticQuestions,
  type PhaseId,
} from "@/content/andragogy/diagnostics";
import { getSession } from "@/lib/auth";
import { listDiagnosticAttempts } from "@/lib/andragogy/learning";

export const dynamic = "force-dynamic";

export default async function AndragogyDiagnosticPhasePage({
  params,
  searchParams,
}: {
  params: Promise<{ phase: string }>;
  searchParams: Promise<{ kind?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login?next=/programs/andragogy/diagnostics");

  const { phase: phaseParam } = await params;
  const phase = Number(phaseParam) as PhaseId;
  if (![1, 2, 3, 4].includes(phase)) notFound();
  const diagnostic = getDiagnosticPhase(phase);
  if (!diagnostic) notFound();

  const query = await searchParams;
  const kind =
    query.kind === "reassessment" ? "reassessment" : "baseline";
  const questions = publicDiagnosticQuestions(diagnostic[kind]);
  const attempts = await listDiagnosticAttempts(session.id, phase);

  return (
    <CourseChrome session={session} active="diagnostics">
      <p className="text-sm uppercase tracking-[0.22em] text-accent">
        Phase {phase}
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight text-foreground">
        {diagnostic.title}
      </h1>
      <p className="mt-3 text-muted">
        Take a baseline to reveal strengths, then reassessment after study.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href={`/programs/andragogy/diagnostics/${phase}?kind=baseline`}
          className={
            kind === "baseline"
              ? "border border-accent bg-accent-soft px-3 py-1.5 text-sm text-accent"
              : "border border-line px-3 py-1.5 text-sm text-muted"
          }
        >
          Baseline
        </Link>
        <Link
          href={`/programs/andragogy/diagnostics/${phase}?kind=reassessment`}
          className={
            kind === "reassessment"
              ? "border border-accent bg-accent-soft px-3 py-1.5 text-sm text-accent"
              : "border border-line px-3 py-1.5 text-sm text-muted"
          }
        >
          Reassessment
        </Link>
      </div>

      {attempts[0] ? (
        <p className="mt-6 text-sm text-muted">
          Latest attempt: {attempts[0].attempt_kind} · {attempts[0].score_pct}% ·
          mastered{" "}
          {attempts[0].skill_scores
            .filter((skill) => skill.mastered)
            .map((skill) => skill.skillId)
            .join(", ") || "none"}
        </p>
      ) : null}

      <div className="mt-8">
        <DiagnosticForm phase={phase} kind={kind} questions={questions} />
      </div>
    </CourseChrome>
  );
}
