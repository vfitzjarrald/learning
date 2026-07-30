import Link from "next/link";
import { redirect } from "next/navigation";
import { CourseChrome } from "@/components/andragogy/CourseChrome";
import { GateItemToggle } from "@/components/andragogy/Interactive";
import { PHASE_GATES } from "@/content/andragogy/gates";
import { PHASES } from "@/content/andragogy/curriculum";
import { getSession } from "@/lib/auth";
import {
  evaluatePhaseGateProgress,
  getBestQuizScores,
  getGateStates,
} from "@/lib/andragogy/learning";
import { getProgressMap } from "@/lib/andragogy/progress";

export const dynamic = "force-dynamic";

export default async function AndragogyGatesPage() {
  const session = await getSession();
  if (!session) redirect("/login?next=/programs/andragogy/gates");

  const [progress, gateStates, quizBest] = await Promise.all([
    getProgressMap(session.id),
    getGateStates(session.id),
    getBestQuizScores(session.id),
  ]);

  return (
    <CourseChrome session={session} active="gates">
      <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-tight text-foreground">
        Phase gates
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Complete lessons, checklist evidence, and the phase knowledge check (≥80%)
        to unlock each gate achievement.
      </p>

      <div className="mt-10 space-y-8">
        {PHASES.map((phase) => {
          const gate = PHASE_GATES[phase.id];
          const status = evaluatePhaseGateProgress({
            phase: phase.id,
            progress,
            gateStates,
            quizBest,
          });
          return (
            <section key={phase.id} className="border border-line p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted">
                    Week {gate.week} · Phase {phase.id}
                  </p>
                  <h2 className="mt-2 text-2xl text-foreground">{phase.name}</h2>
                  <p className="mt-2 text-sm text-muted">
                    Lessons {status?.lessonsDone}/{status?.lessonsTotal} · Checklist{" "}
                    {status?.checklistDone}/{status?.checklistTotal} · Quiz{" "}
                    {status?.quizScore != null ? `${status.quizScore}%` : "—"}
                    {status?.readyToUnlock ? " · Ready" : ""}
                  </p>
                </div>
                <Link
                  href={`/programs/andragogy/checks?scope=phase-${phase.id}`}
                  className="text-sm text-accent hover:underline"
                >
                  Take phase quiz
                </Link>
              </div>
              <div className="mt-5 space-y-2">
                {gate.items.map((item) => (
                  <GateItemToggle
                    key={item.key}
                    phase={phase.id}
                    itemKey={item.key}
                    label={item.label}
                    done={gateStates.get(`${phase.id}:${item.key}`) ?? false}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </CourseChrome>
  );
}
