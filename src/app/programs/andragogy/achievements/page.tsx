import { redirect } from "next/navigation";
import { AchievementBadge } from "@/components/andragogy/AchievementBadge";
import { CourseChrome } from "@/components/andragogy/CourseChrome";
import { ACHIEVEMENTS } from "@/content/andragogy/achievements";
import { getSession } from "@/lib/auth";
import {
  listEarnedAchievements,
  syncAchievementsFromProgress,
} from "@/lib/andragogy/learning";

export const dynamic = "force-dynamic";

export default async function AndragogyAchievementsPage() {
  const session = await getSession();
  if (!session) redirect("/login?next=/programs/andragogy/achievements");

  await syncAchievementsFromProgress(session.id);
  const earned = await listEarnedAchievements(session.id);
  const earnedMap = new Map(
    earned.map((item) => [item.achievement_id, item.earned_at]),
  );

  return (
    <CourseChrome session={session} active="achievements">
      <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-tight text-foreground">
        Achievements
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Icon badges for skills, phase gates, and expert status — earned through
        diagnostics, completed weeks, and gate checklists.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map((achievement) => {
          const when = earnedMap.get(achievement.id);
          return (
            <div
              key={achievement.id}
              className="flex flex-col items-center border border-line p-6 text-center"
            >
              <AchievementBadge
                achievement={achievement}
                earned={Boolean(when)}
                size={104}
                showTitle
              />
              <p className="mt-4 text-sm text-muted">{achievement.description}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.16em] text-muted">
                {achievement.category} · phase {achievement.phase}
              </p>
              <p className="mt-2 text-xs text-muted">{achievement.howToEarn}</p>
              {when ? (
                <p className="mt-3 text-xs text-accent">
                  Earned {new Date(when).toLocaleDateString()}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </CourseChrome>
  );
}
