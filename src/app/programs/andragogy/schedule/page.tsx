import Link from "next/link";
import { redirect } from "next/navigation";
import { CourseChrome } from "@/components/andragogy/CourseChrome";
import {
  getPhaseForWeek,
  padWeek,
  PHASES,
  WEEKS,
} from "@/content/andragogy/curriculum";
import { getSession } from "@/lib/auth";
import { getProgressMap } from "@/lib/andragogy/progress";

export const dynamic = "force-dynamic";

export default async function AndragogySchedulePage() {
  const session = await getSession();
  if (!session) redirect("/login?next=/programs/andragogy/schedule");
  const progress = await getProgressMap(session.id);

  return (
    <CourseChrome session={session} active="schedule">
      <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-tight text-foreground">
        Schedule
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        16 weeks · Mon–Fri lessons · phase gates at weeks 4, 8, 12, and 16.
      </p>

      <div className="mt-10 space-y-10">
        {PHASES.map((phase) => (
          <section key={phase.id}>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-foreground">
              Phase {phase.id}: {phase.name}
            </h2>
            <p className="mt-2 text-sm text-muted">{phase.summary}</p>
            <ul className="mt-5 space-y-4">
              {WEEKS.filter((week) => week.phase === phase.id).map((week) => {
                const doneCount = week.days.filter(
                  (day) =>
                    progress.get(`${week.week}-${day.day}`)?.completed,
                ).length;
                return (
                  <li key={week.week} className="border border-line p-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                          Week {padWeek(week.week)} · {doneCount}/5 complete
                        </p>
                        <p className="mt-1 text-foreground">{week.title}</p>
                      </div>
                      <Link
                        href={`/programs/andragogy/weeks/${week.week}/days/1`}
                        className="text-sm text-accent hover:underline"
                      >
                        Open week
                      </Link>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {week.days.map((day) => {
                        const done = Boolean(
                          progress.get(`${week.week}-${day.day}`)?.completed,
                        );
                        return (
                          <Link
                            key={day.day}
                            href={`/programs/andragogy/weeks/${week.week}/days/${day.day}`}
                            className={
                              done
                                ? "border border-accent px-2 py-1 text-xs text-accent"
                                : "border border-line px-2 py-1 text-xs text-muted hover:border-accent hover:text-accent"
                            }
                          >
                            D{day.day}
                          </Link>
                        );
                      })}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted">
        Current focus phase helpers use{" "}
        {getPhaseForWeek(1).name} through Phase 4.
      </p>
    </CourseChrome>
  );
}
