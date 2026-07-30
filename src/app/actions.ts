"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  isContentTypeSlug,
  isDomainSlug,
  type ContentTypeSlug,
  type DomainSlug,
} from "@/config/domains";
import {
  clearSessionCookie,
  setSessionCookie,
  toSessionUser,
  requireSession,
  verifyPassword,
} from "@/lib/auth";
import { todayDateKey } from "@/lib/dates";
import { upsertNote } from "@/lib/notes";
import { ensureAdminSeeded, findUserByUsername } from "@/lib/users";

export type ActionResult =
  | { ok: true; message?: string }
  | { ok: false; error: string };

export async function loginAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  try {
    await ensureAdminSeeded();
  } catch {
    // seed may fail if DB is misconfigured; login error below is clearer
  }

  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { ok: false, error: "Username and password are required." };
  }

  try {
    const user = await findUserByUsername(username);
    if (!user || !user.is_active || user.role !== "admin") {
      return { ok: false, error: "Invalid username or password." };
    }
    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return { ok: false, error: "Invalid username or password." };
    }
    await setSessionCookie(toSessionUser(user));
  } catch (err) {
    console.error(err);
    return {
      ok: false,
      error:
        "Could not sign in. On Vercel, confirm Neon DATABASE_URL plus SESSION_SECRET/ADMIN_* env vars. Locally, set ADMIN_USERNAME and ADMIN_PASSWORD (or DATABASE_URL + migrate).",
    };
  }

  redirect("/myday");
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/login");
}

export async function saveNoteAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  let session;
  try {
    session = await requireSession();
  } catch {
    return { ok: false, error: "You must be signed in to save notes." };
  }

  const noteDate = String(formData.get("noteDate") ?? todayDateKey()).trim();
  const domainRaw = String(formData.get("domain") ?? "").trim();
  const contentTypeRaw = String(formData.get("contentType") ?? "").trim();
  const body = String(formData.get("body") ?? "");

  if (!/^\d{4}-\d{2}-\d{2}$/.test(noteDate)) {
    return { ok: false, error: "Invalid note date." };
  }
  if (!isDomainSlug(domainRaw)) {
    return { ok: false, error: "Choose a valid domain." };
  }
  if (!isContentTypeSlug(contentTypeRaw)) {
    return { ok: false, error: "Choose a valid content type." };
  }

  try {
    await upsertNote({
      userId: session.id,
      noteDate,
      domain: domainRaw as DomainSlug,
      contentType: contentTypeRaw as ContentTypeSlug,
      body,
    });
  } catch (err) {
    console.error(err);
    return { ok: false, error: "Could not save note." };
  }

  revalidatePath("/myday");
  revalidatePath("/notes");
  return { ok: true, message: "Note saved." };
}
