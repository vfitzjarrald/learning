import { randomUUID } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { hash } from "bcryptjs";
import type { DbNote, DbUser, UserRole } from "./db";
import { hasRemoteDatabase } from "./env";

type StoreData = {
  users: DbUser[];
  notes: DbNote[];
};

function storePath() {
  return path.join(process.cwd(), "data", "local-store.json");
}

function emptyStore(): StoreData {
  return { users: [], notes: [] };
}

function readStore(): StoreData {
  const file = storePath();
  if (!existsSync(file)) return emptyStore();
  const data = JSON.parse(readFileSync(file, "utf8")) as StoreData;
  if (!Array.isArray(data.users)) data.users = [];
  if (!Array.isArray(data.notes)) data.notes = [];
  return data;
}

function writeStore(data: StoreData) {
  const dir = path.dirname(storePath());
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(storePath(), JSON.stringify(data, null, 2), "utf8");
}

export function isLocalStoreMode() {
  return !hasRemoteDatabase();
}

export async function localEnsureAdminSeeded() {
  const data = readStore();
  if (data.users.some((user) => user.role === "admin")) return;

  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) return;

  data.users.push({
    id: randomUUID(),
    username,
    password_hash: await hash(password, 12),
    role: "admin" satisfies UserRole,
    display_name: "Admin",
    is_active: true,
    created_at: new Date().toISOString(),
  });
  writeStore(data);
}

export async function localFindUserByUsername(username: string) {
  await localEnsureAdminSeeded();
  const data = readStore();
  return (
    data.users.find(
      (user) => user.username.toLowerCase() === username.toLowerCase(),
    ) ?? null
  );
}

export async function localGetUserById(userId: string) {
  const data = readStore();
  return data.users.find((user) => user.id === userId) ?? null;
}

export async function localUpsertNote(input: {
  userId: string;
  noteDate: string;
  domain: string;
  contentType: string;
  body: string;
}) {
  const data = readStore();
  const existing = data.notes.find(
    (note) =>
      note.user_id === input.userId &&
      note.note_date === input.noteDate &&
      note.domain === input.domain &&
      note.content_type === input.contentType,
  );
  const updatedAt = new Date().toISOString();

  if (existing) {
    existing.body = input.body;
    existing.updated_at = updatedAt;
    writeStore(data);
    return existing;
  }

  const note: DbNote = {
    id: randomUUID(),
    user_id: input.userId,
    note_date: input.noteDate,
    domain: input.domain,
    content_type: input.contentType,
    body: input.body,
    updated_at: updatedAt,
  };
  data.notes.push(note);
  writeStore(data);
  return note;
}

export async function localGetNote(input: {
  userId: string;
  noteDate: string;
  domain: string;
  contentType: string;
}) {
  const data = readStore();
  return (
    data.notes.find(
      (note) =>
        note.user_id === input.userId &&
        note.note_date === input.noteDate &&
        note.domain === input.domain &&
        note.content_type === input.contentType,
    ) ?? null
  );
}

export async function localListNotes(userId: string, limit = 50) {
  const data = readStore();
  return data.notes
    .filter((note) => note.user_id === userId)
    .sort((a, b) => {
      const byDate = b.note_date.localeCompare(a.note_date);
      if (byDate !== 0) return byDate;
      return b.updated_at.localeCompare(a.updated_at);
    })
    .slice(0, limit);
}

export async function localListNotesForDate(userId: string, noteDate: string) {
  const data = readStore();
  return data.notes
    .filter((note) => note.user_id === userId && note.note_date === noteDate)
    .sort((a, b) => b.updated_at.localeCompare(a.updated_at));
}
