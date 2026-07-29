import { getDb, type DbUser } from "./db";
import {
  isLocalStoreMode,
  localEnsureAdminSeeded,
  localFindUserByUsername,
  localGetUserById,
} from "./local-store";
import { hashPassword } from "./password";

export async function ensureAdminSeeded() {
  if (isLocalStoreMode()) {
    await localEnsureAdminSeeded();
    return;
  }

  const sql = getDb();
  const admins = await sql`SELECT id FROM users WHERE role = 'admin' LIMIT 1`;
  if (admins.length > 0) return;

  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) {
    console.warn(
      "No admin user and ADMIN_USERNAME/ADMIN_PASSWORD not set — skipping seed",
    );
    return;
  }

  const passwordHash = await hashPassword(password);
  await sql`
    INSERT INTO users (username, password_hash, role, display_name)
    VALUES (${username}, ${passwordHash}, 'admin', 'Admin')
  `;
}

export async function findUserByUsername(
  username: string,
): Promise<DbUser | null> {
  if (isLocalStoreMode()) {
    return localFindUserByUsername(username);
  }

  const sql = getDb();
  const rows = await sql`
    SELECT id, username, password_hash, role, display_name, is_active, created_at::text
    FROM users
    WHERE lower(username) = lower(${username})
    LIMIT 1
  `;
  return (rows[0] as DbUser | undefined) ?? null;
}

export async function getUserById(userId: string): Promise<DbUser | null> {
  if (isLocalStoreMode()) {
    return localGetUserById(userId);
  }
  const sql = getDb();
  const rows = await sql`
    SELECT id, username, password_hash, role, display_name, is_active, created_at::text
    FROM users
    WHERE id = ${userId}
    LIMIT 1
  `;
  return (rows[0] as DbUser | undefined) ?? null;
}
