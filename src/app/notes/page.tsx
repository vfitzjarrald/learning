import Link from "next/link";
import { redirect } from "next/navigation";
import { AppChrome } from "@/components/AppChrome";
import { contentTypeLabel, domainLabel } from "@/config/domains";
import { getSession } from "@/lib/auth";
import { formatDisplayDate } from "@/lib/dates";
import { listNotes } from "@/lib/notes";

export const dynamic = "force-dynamic";

export default async function NotesPage() {
  const session = await getSession();
  if (!session) redirect("/login?next=/notes");

  const notes = await listNotes(session.id, 100);

  return (
    <AppChrome session={session} active="notes">
      <section className="mb-8">
        <p className="text-sm uppercase tracking-[0.22em] text-accent">Notes</p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight text-foreground">
          Private archive
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          Every note is keyed by calendar day, domain, and content type — only
          visible when you are signed in.
        </p>
      </section>

      {notes.length === 0 ? (
        <div className="border border-line px-5 py-10 text-muted">
          No notes yet.{" "}
          <Link href="/myday" className="text-accent hover:underline">
            Start in MyDay
          </Link>
          .
        </div>
      ) : (
        <ul className="space-y-4">
          {notes.map((note) => (
            <li key={note.id} className="border border-line px-5 py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="text-sm text-muted">
                  {formatDisplayDate(note.note_date)} ·{" "}
                  {domainLabel(note.domain)} ·{" "}
                  {contentTypeLabel(note.content_type)}
                </p>
                <Link
                  href={`/myday?domain=${note.domain}&type=${note.content_type}`}
                  className="text-sm text-accent hover:underline"
                >
                  Open in MyDay
                </Link>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-foreground">
                {note.body.trim() || "Empty note"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </AppChrome>
  );
}
