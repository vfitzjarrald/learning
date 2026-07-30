import Link from "next/link";
import { redirect } from "next/navigation";
import { CourseChrome } from "@/components/andragogy/CourseChrome";
import {
  GateIcon,
  LayersIcon,
  ProgressIcon,
  QuizIcon,
  TrophyIcon,
} from "@/components/andragogy/Icons";
import {
  getDay,
  getPhaseForWeek,
  getWeek,
  padWeek,
  PHASES,
} from "@/content/andragogy/curriculum";
import { isGateWeek } from "@/content/andragogy/checks";
import { getSession } from "@/lib/auth";
import {
  evaluatePhaseGateProgress,
  getBestQuizScores,
  getGateStates,
  listEarnedAchievements,
} from "@/lib/andragogy/learning";
import { getLearnerQueue } from "@/lib/andragogy/progress";

export const dynamic = "force-dynamic";

export default async function AndragogyHomePage() {
  const session = await getSession();
  if (!session) redirect("/login?next=/programs/andragogy");

  const queue = await getLearnerQueue(session.id);
  const focusWeek = queue.today?.week ?? 1;
  const phase = getPhaseForWeek(focusWeek);
  const todayWeek = queue.today ? getWeek(queue.today.week) : null;
  const todayDay =
    queue.today && todayWeek
      ? getDay(queue.today.week, queue.today.day)
      : null;

  const [quizBest, gateStates, progressModule, earned] = await Promise.all([
    getBestQuizScores(session.id),
    getGateStates(session.id),
    import("@/lib/andragogy/progress").then((m) => m.getProgressMap(session.id)),
    listEarnedAchievements(session.id),
  ]);

  const gateProgress = evaluatePhaseGateProgress({
    phase: phase.id,
    progress: progressModule,
    gateStates,
    quizBest,
  });
  const quizScore = quizBest.get(`phase-${phase.id}`) ?? null;

  return (
    <CourseChrome session={session} active="home">
      <section className="mb-10">
        <p className="text-sm uppercase tracking-[0.22em] text-accent">
          Web-only · 16 weeks · Phase {phase.id}
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight text-foreground sm:text-5xl">
          My Andragogy Day
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          Stay on the adult-learning expert path: study today’s lesson, keep
          private notes, pass diagnostics and knowledge checks, and unlock icon
          achievements at each gate.
        </p>
      </section>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="border border-line p-4">
          <div className="flex items-center gap-2 text-muted">
            <ProgressIcon size={16} />
            <span className="text-xs uppercase tracking-[0.16em]">Progress</span>
          </div>
          <p className="mt-2 text-2xl text-foreground">{queue.stats.percent}%</p>
          <p className="text-sm text-muted">
            {queue.stats.completedLessons} done · {queue.stats.remaining} left
          </p>
        </div>
        <div className="border border-line p-4">
          <div className="flex items-center gap-2 text-muted">
            <QuizIcon size={16} />
            <span className="text-xs uppercase tracking-[0.16em]">
              Phase quiz
            </span>
          </div>
          <p className="mt-2 text-2xl text-foreground">
            {quizScore != null ? `${quizScore}%` : "—"}
          </p>
          <Link
            href={`/programs/andragogy/checks?scope=phase-${phase.id}`}
            className="mt-2 inline-block text-sm text-accent hover:underline"
          >
            Knowledge checks
          </Link>
        </div>
        <div className="border border-line p-4">
          <div className="flex items-center gap-2 text-muted">
            <GateIcon size={16} />
            <span className="text-xs uppercase tracking-[0.16em]">Gate</span>
          </div>
          <p className="mt-2 text-2xl text-foreground">
            {gateProgress
              ? `${gateProgress.checklistDone}/${gateProgress.checklistTotal}`
              : "—"}
          </p>
          <Link
            href="/programs/andragogy/gates"
            className="mt-2 inline-block text-sm text-accent hover:underline"
          >
            Open gates
          </Link>
        </div>
        <div className="border border-line p-4">
          <div className="flex items-center gap-2 text-muted">
            <TrophyIcon size={16} />
            <span className="text-xs uppercase tracking-[0.16em]">
              Achievements
            </span>
          </div>
          <p className="mt-2 text-2xl text-foreground">{earned.length}</p>
          <Link
            href="/programs/andragogy/achievements"
            className="mt-2 inline-block text-sm text-accent hover:underline"
          >
            View badges
          </Link>
        </div>
      </div>

      {queue.courseComplete ? (
        <div className="border border-line p-6">
          <h2 className="text-xl text-foreground">Course complete</h2>
          <p className="mt-2 text-muted">
            Review gates, retake the expert check, or revisit any week.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/programs/andragogy/checks?scope=all"
              className="bg-accent px-4 py-2 text-sm font-semibold text-[#041018]"
            >
              Expert knowledge check
            </Link>
            <Link
              href="/programs/andragogy/schedule"
              className="border border-line px-4 py-2 text-sm text-foreground"
            >
              Browse schedule
            </Link>
          </div>
        </div>
      ) : todayWeek && todayDay && queue.today ? (
        <div className="border border-line p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">
            Today · Week {padWeek(queue.today.week)} · Day {queue.today.day}
            {isGateWeek(queue.today.week) ? " · Gate week" : ""}
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl text-foreground">
            {todayDay.title}
          </h2>
          <p className="mt-2 text-sm text-muted">{todayWeek.title}</p>
          <p className="mt-4 text-foreground">
            <span className="text-muted">Objective: </span>
            {todayDay.objective}
          </p>
          <p className="mt-2 text-foreground">
            <span className="text-muted">Deliverable: </span>
            {todayDay.deliverable}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/programs/andragogy/weeks/${queue.today.week}/days/${queue.today.day}`}
              className="bg-accent px-5 py-3 text-sm font-semibold text-[#041018]"
            >
              Open today’s lesson
            </Link>
            <Link
              href={`/programs/andragogy/diagnostics/${phase.id}`}
              className="border border-line px-5 py-3 text-sm text-foreground"
            >
              Phase {phase.id} diagnostic
            </Link>
          </div>
        </div>
      ) : null}

      <section className="mt-10">
        <div className="mb-4 flex items-center gap-2">
          <LayersIcon size={18} className="text-accent" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-foreground">
            Phases
          </h2>
        </div>
        <ul className="grid gap-4 md:grid-cols-2">
          {PHASES.map((item) => (
            <li key={item.id} className="border border-line p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">
                Phase {item.id} · Weeks {item.weekStart}–{item.weekEnd}
              </p>
              <p className="mt-2 text-lg text-foreground">{item.name}</p>
              <p className="mt-2 text-sm text-muted">{item.summary}</p>
            </li>
          ))}
        </ul>
      </section>
    </CourseChrome>
  );
}
