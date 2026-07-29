import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let sql: NeonQueryFunction<false, false> | null = null;

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  if (!sql) {
    sql = neon(url);
  }
  return sql;
}

export type UserRole = "admin";

export type DbUser = {
  id: string;
  username: string;
  password_hash: string;
  role: UserRole;
  display_name: string | null;
  is_active: boolean;
  created_at: string;
};

export type DbNote = {
  id: string;
  user_id: string;
  note_date: string;
  domain: string;
  content_type: string;
  body: string;
  updated_at: string;
};
