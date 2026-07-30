import Link from "next/link";
import { redirect } from "next/navigation";
import { CourseChrome } from "@/components/andragogy/CourseChrome";
import { DIAGNOSTICS } from "@/content/andragogy/diagnostics";
import { getSession } from "@/lib/auth";
import { listDiagnosticAttempts } from "@/lib/andragogy/learning";

export const dynamic = "force-dynamic";

export default async function AndragogyDiagnosticsIndexPage() {
  const session = await getSession();
  if (!session) redirect("/login?next=/programs/andragogy/diagnostics");
  const attempts = await listDiagnosticAttempts(session.id);

  return (
    <CourseChrome session={session} active="diagnostics">
      <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-tight text-foreground">
        Diagnostics
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Baseline before a phase and reassessment after study. Skills scoring
        ≥80% earn related achievements.
      </p>

      <ul className="mt-8 space-y-4">
        {DIAGNOSTICS.phases.map((phase) => {
          const latest = attempts.find((item) => item.phase === phase.phase);
          return (
            <li key={phase.phase} className="border border-line p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted">
                    Phase {phase.phase}
                  </p>
                  <p className="mt-1 text-lg text-foreground">{phase.title}</p>
                  <p className="mt-2 text-sm text-muted">
                    {latest
                      ? `Latest: ${latest.attempt_kind} · ${latest.score_pct}%`
                      : "No attempts yet"}
                  </p>
                </div>
                <Link
                  href={`/programs/andragogy/diagnostics/${phase.phase}`}
                  className="bg-accent px-4 py-2 text-sm font-semibold text-[#041018]"
                >
                  Open diagnostic
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </CourseChrome>
  );
}
