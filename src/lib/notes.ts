import type { ContentTypeSlug, DomainSlug } from "@/config/domains";
import { getDb, type DbNote } from "./db";
import {
  isLocalStoreMode,
  localGetNote,
  localListNotes,
  localListNotesForDate,
  localUpsertNote,
} from "./local-store";

export async function upsertNote(input: {
  userId: string;
  noteDate: string;
  domain: DomainSlug;
  contentType: ContentTypeSlug;
  body: string;
}): Promise<DbNote> {
  if (isLocalStoreMode()) {
    return localUpsertNote(input);
  }

  const sql = getDb();
  const rows = await sql`
    INSERT INTO notes (user_id, note_date, domain, content_type, body, updated_at)
    VALUES (
      ${input.userId},
      ${input.noteDate}::date,
      ${input.domain},
      ${input.contentType},
      ${input.body},
      NOW()
    )
    ON CONFLICT (user_id, note_date, domain, content_type)
    DO UPDATE SET
      body = EXCLUDED.body,
      updated_at = NOW()
    RETURNING
      id,
      user_id,
      note_date::text,
      domain,
      content_type,
      body,
      updated_at::text
  `;
  return rows[0] as DbNote;
}

export async function getNote(input: {
  userId: string;
  noteDate: string;
  domain: DomainSlug;
  contentType: ContentTypeSlug;
}): Promise<DbNote | null> {
  if (isLocalStoreMode()) {
    return localGetNote(input);
  }

  const sql = getDb();
  const rows = await sql`
    SELECT
      id,
      user_id,
      note_date::text,
      domain,
      content_type,
      body,
      updated_at::text
    FROM notes
    WHERE user_id = ${input.userId}
      AND note_date = ${input.noteDate}::date
      AND domain = ${input.domain}
      AND content_type = ${input.contentType}
    LIMIT 1
  `;
  return (rows[0] as DbNote | undefined) ?? null;
}

export async function listNotes(userId: string, limit = 50): Promise<DbNote[]> {
  if (isLocalStoreMode()) {
    return localListNotes(userId, limit);
  }

  const sql = getDb();
  const rows = await sql`
    SELECT
      id,
      user_id,
      note_date::text,
      domain,
      content_type,
      body,
      updated_at::text
    FROM notes
    WHERE user_id = ${userId}
    ORDER BY note_date DESC, updated_at DESC
    LIMIT ${limit}
  `;
  return rows as DbNote[];
}

export async function listNotesForDate(
  userId: string,
  noteDate: string,
): Promise<DbNote[]> {
  if (isLocalStoreMode()) {
    return localListNotesForDate(userId, noteDate);
  }

  const sql = getDb();
  const rows = await sql`
    SELECT
      id,
      user_id,
      note_date::text,
      domain,
      content_type,
      body,
      updated_at::text
    FROM notes
    WHERE user_id = ${userId}
      AND note_date = ${noteDate}::date
    ORDER BY updated_at DESC
  `;
  return rows as DbNote[];
}
