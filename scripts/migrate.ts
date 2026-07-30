import { neon } from "@neondatabase/serverless";
import { hash } from "bcryptjs";
import { config } from "dotenv";

config({ path: ".env.local" });
config();

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is required");
  }
  if (url.includes("placeholder")) {
    throw new Error(
      "DATABASE_URL is still a placeholder. Create a Neon DB and put the connection string in .env.local",
    );
  }

  const sql = neon(url);

  console.log("Applying schema…");
  await sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('admin')),
      display_name TEXT,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS notes (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      note_date DATE NOT NULL,
      domain TEXT NOT NULL,
      content_type TEXT NOT NULL,
      body TEXT NOT NULL DEFAULT '',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (user_id, note_date, domain, content_type)
    )
  `;

  await sql`CREATE INDEX IF NOT EXISTS idx_notes_user_date ON notes(user_id, note_date DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_notes_user_domain ON notes(user_id, domain)`;

  const admins = await sql`SELECT id FROM users WHERE role = 'admin' LIMIT 1`;
  if (admins.length === 0) {
    const username = process.env.ADMIN_USERNAME?.trim();
    const password = process.env.ADMIN_PASSWORD;
    if (!username || !password) {
      console.warn(
        "Schema applied, but ADMIN_USERNAME/ADMIN_PASSWORD missing — no admin seeded.",
      );
    } else {
      const passwordHash = await hash(password, 12);
      await sql`
        INSERT INTO users (username, password_hash, role, display_name)
        VALUES (${username}, ${passwordHash}, 'admin', 'Admin')
      `;
      console.log(`Seeded admin user: ${username}`);
    }
  } else {
    console.log("Admin already present — skip seed.");
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
