import { getDb } from "@/lib/db";
import {
  DAYS_PER_WEEK,
  TOTAL_LESSONS,
  TOTAL_WEEKS,
  type LessonPosition,
} from "@/content/andragogy/curriculum";
import {
  isAndragogyLocalMode,
  localGetDayNote,
  localGetDayProgress,
  localGetProgressMap,
  localSetDayCompleted,
  localUpsertDayNote,
} from "./store";

export type ProgressEntry = { completed: boolean; completedAt: string | null };

export function findIncompleteLessons(
  progress: Map<string, ProgressEntry>,
  limit = 2,
): LessonPosition[] {
  const out: LessonPosition[] = [];
  for (let week = 1; week <= TOTAL_WEEKS; week++) {
    for (let day = 1; day <= DAYS_PER_WEEK; day++) {
      if (!progress.get(`${week}-${day}`)?.completed) {
        out.push({ week, day });
        if (out.length >= limit) return out;
      }
    }
  }
  return out;
}

export async function getProgressMap(userId: string) {
  if (isAndragogyLocalMode()) return localGetProgressMap(userId);
  const sql = getDb();
  const rows = await sql`
    SELECT week, day, completed, completed_at::text
    FROM andragogy_day_progress
    WHERE user_id = ${userId}
  `;
  const map = new Map<string, ProgressEntry>();
  for (const row of rows as Array<{
    week: number;
    day: number;
    completed: boolean;
    completed_at: string | null;
  }>) {
    map.set(`${row.week}-${row.day}`, {
      completed: row.completed,
      completedAt: row.completed_at,
    });
  }
  return map;
}

export async function getDayProgress(userId: string, week: number, day: number) {
  if (isAndragogyLocalMode()) return localGetDayProgress(userId, week, day);
  const sql = getDb();
  const rows = await sql`
    SELECT completed, completed_at::text
    FROM andragogy_day_progress
    WHERE user_id = ${userId} AND week = ${week} AND day = ${day}
    LIMIT 1
  `;
  const row = rows[0] as
    | { completed: boolean; completed_at: string | null }
    | undefined;
  return {
    completed: row?.completed ?? false,
    completedAt: row?.completed_at ?? null,
  };
}

export async function setDayCompleted(
  userId: string,
  week: number,
  day: number,
  completed: boolean,
) {
  if (isAndragogyLocalMode()) {
    localSetDayCompleted(userId, week, day, completed);
    return;
  }
  const sql = getDb();
  if (completed) {
    await sql`
      INSERT INTO andragogy_day_progress (user_id, week, day, completed, completed_at)
      VALUES (${userId}, ${week}, ${day}, TRUE, NOW())
      ON CONFLICT (user_id, week, day)
      DO UPDATE SET completed = TRUE, completed_at = NOW()
    `;
  } else {
    await sql`
      INSERT INTO andragogy_day_progress (user_id, week, day, completed, completed_at)
      VALUES (${userId}, ${week}, ${day}, FALSE, NULL)
      ON CONFLICT (user_id, week, day)
      DO UPDATE SET completed = FALSE, completed_at = NULL
    `;
  }
}

export async function getDayNote(userId: string, week: number, day: number) {
  if (isAndragogyLocalMode()) return localGetDayNote(userId, week, day);
  const sql = getDb();
  const rows = await sql`
    SELECT body, updated_at::text
    FROM andragogy_day_notes
    WHERE user_id = ${userId} AND week = ${week} AND day = ${day}
    LIMIT 1
  `;
  const row = rows[0] as { body: string; updated_at: string } | undefined;
  return row
    ? { user_id: userId, week, day, body: row.body, updated_at: row.updated_at }
    : null;
}

export async function upsertDayNote(
  userId: string,
  week: number,
  day: number,
  body: string,
) {
  if (isAndragogyLocalMode()) {
    localUpsertDayNote(userId, week, day, body);
    return;
  }
  const sql = getDb();
  await sql`
    INSERT INTO andragogy_day_notes (user_id, week, day, body, updated_at)
    VALUES (${userId}, ${week}, ${day}, ${body}, NOW())
    ON CONFLICT (user_id, week, day)
    DO UPDATE SET body = EXCLUDED.body, updated_at = NOW()
  `;
}

export async function getLearnerQueue(userId: string) {
  const progress = await getProgressMap(userId);
  let completed = 0;
  for (const entry of progress.values()) {
    if (entry.completed) completed += 1;
  }
  const incomplete = findIncompleteLessons(progress, 2);
  return {
    today: incomplete[0] ?? null,
    tomorrow: incomplete[1] ?? null,
    stats: {
      completedLessons: completed,
      remaining: Math.max(0, TOTAL_LESSONS - completed),
      percent: Math.round((completed / TOTAL_LESSONS) * 100),
    },
    courseComplete: completed >= TOTAL_LESSONS,
  };
}
