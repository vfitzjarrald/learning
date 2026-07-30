import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CourseChrome } from "@/components/andragogy/CourseChrome";
import {
  CompleteToggle,
  DayNoteEditor,
} from "@/components/andragogy/Interactive";
import {
  getDay,
  getPhaseForWeek,
  getWeek,
  nextLessonPosition,
  padWeek,
  previousLessonPosition,
  TOTAL_WEEKS,
} from "@/content/andragogy/curriculum";
import { getSession } from "@/lib/auth";
import { getDayNote, getDayProgress } from "@/lib/andragogy/progress";

export const dynamic = "force-dynamic";

export default async function AndragogyDayPage({
  params,
}: {
  params: Promise<{ week: string; day: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login?next=/programs/andragogy");

  const { week: weekParam, day: dayParam } = await params;
  const weekNum = Number(weekParam);
  const dayNum = Number(dayParam);
  if (
    !weekNum ||
    weekNum < 1 ||
    weekNum > TOTAL_WEEKS ||
    !dayNum ||
    dayNum < 1 ||
    dayNum > 5
  ) {
    notFound();
  }

  const week = getWeek(weekNum);
  const day = getDay(weekNum, dayNum);
  if (!week || !day) notFound();

  const phase = getPhaseForWeek(weekNum);
  const [progress, note] = await Promise.all([
    getDayProgress(session.id, weekNum, dayNum),
    getDayNote(session.id, weekNum, dayNum),
  ]);
  const prev = previousLessonPosition(weekNum, dayNum);
  const next = nextLessonPosition(weekNum, dayNum);

  return (
    <CourseChrome session={session} active="schedule">
      <p className="text-sm uppercase tracking-[0.22em] text-accent">
        Phase {phase.id} · Week {padWeek(weekNum)} · Day {dayNum}
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight text-foreground">
        {day.title}
      </h1>
      <p className="mt-2 text-muted">{week.title}</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <section className="space-y-6">
          <div className="border border-line p-5">
            <p className="text-sm text-muted">Objective</p>
            <p className="mt-2 text-foreground">{day.objective}</p>
            <p className="mt-4 text-sm text-muted">Deliverable</p>
            <p className="mt-2 text-foreground">{day.deliverable}</p>
          </div>

          <div>
            <h2 className="text-lg text-foreground">Sources</h2>
            <ul className="mt-3 space-y-2">
              {day.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent hover:underline"
                  >
                    {source.title}
                  </a>
                  <span className="text-sm text-muted">
                    {" "}
                    · ~{source.minutes} min
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg text-foreground">Lab steps</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted">
              {day.labSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <CompleteToggle
              week={weekNum}
              day={dayNum}
              completed={progress.completed}
            />
            {prev ? (
              <Link
                href={`/programs/andragogy/weeks/${prev.week}/days/${prev.day}`}
                className="text-sm text-muted hover:text-accent"
              >
                Previous
              </Link>
            ) : null}
            {next ? (
              <Link
                href={`/programs/andragogy/weeks/${next.week}/days/${next.day}`}
                className="text-sm text-muted hover:text-accent"
              >
                Next
              </Link>
            ) : null}
          </div>
        </section>

        <aside className="border border-line p-5">
          <h2 className="text-lg text-foreground">Private notes</h2>
          <p className="mt-2 text-sm text-muted">
            Saved to your account for this lesson day.
          </p>
          <div className="mt-4">
            <DayNoteEditor
              key={`${weekNum}-${dayNum}-${note?.updated_at ?? "new"}`}
              week={weekNum}
              day={dayNum}
              initialBody={note?.body ?? ""}
            />
          </div>
        </aside>
      </div>
    </CourseChrome>
  );
}
