import Link from "next/link";
import { redirect } from "next/navigation";
import { AppChrome } from "@/components/AppChrome";
import { NoteEditor } from "@/components/NoteEditor";
import { DOMAINS, domainLabel, type DomainSlug } from "@/config/domains";
import { PROGRAMS } from "@/config/programs";
import { getSession } from "@/lib/auth";
import { formatDisplayDate, formatRelativeTime, todayDateKey } from "@/lib/dates";
import { getDomainNews } from "@/lib/news";
import { getNote, listNotesForDate } from "@/lib/notes";
import { ensureAdminSeeded } from "@/lib/users";

export const dynamic = "force-dynamic";

export default async function MyDayPage({
  searchParams,
}: {
  searchParams: Promise<{ domain?: string; type?: string }>;
}) {
  try {
    await ensureAdminSeeded();
  } catch {
    // ignore until storage configured
  }

  const session = await getSession();
  if (!session) redirect("/login?next=/myday");

  const params = await searchParams;
  const noteDate = todayDateKey();
  const domain = (
    DOMAINS.some((item) => item.slug === params.domain)
      ? params.domain
      : "ai"
  ) as DomainSlug;
  const contentType =
    params.type === "blog" ||
    params.type === "video" ||
    params.type === "article" ||
    params.type === "rss" ||
    params.type === "program-lesson" ||
    params.type === "personal"
      ? params.type
      : "personal";

  const [news, existingNote, todaysNotes] = await Promise.all([
    getDomainNews({ limit: 8 }),
    getNote({
      userId: session.id,
      noteDate,
      domain,
      contentType,
    }),
    listNotesForDate(session.id, noteDate),
  ]);

  return (
    <AppChrome session={session} active="myday">
      <section className="animate-rise mb-10">
        <p className="text-sm uppercase tracking-[0.22em] text-accent">MyDay</p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight text-foreground sm:text-5xl">
          {formatDisplayDate(noteDate)}
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          Collate AI, education, pedagogy, andragogy, content development,
          product management, and Cursor/Copilot updates — then keep private
          notes by day and content type.
        </p>
      </section>

      <div className="mb-8 flex flex-wrap gap-2">
        {DOMAINS.map((item) => (
          <Link
            key={item.slug}
            href={`/myday?domain=${item.slug}&type=${contentType}`}
            className={
              item.slug === domain
                ? "border border-accent bg-accent-soft px-3 py-1.5 text-sm text-accent"
                : "border border-line px-3 py-1.5 text-sm text-muted transition hover:border-accent hover:text-accent"
            }
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <section className="animate-rise-delay space-y-8">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-foreground">
              Today’s note
            </h2>
            <p className="mt-2 text-sm text-muted">
              Saved privately by date, domain, and content type.
            </p>
            <div className="mt-5 border border-line bg-panel p-5 sm:p-6">
              <NoteEditor
                key={`${noteDate}-${domain}-${contentType}-${existingNote?.updated_at ?? "new"}`}
                noteDate={noteDate}
                initialDomain={domain}
                initialContentType={contentType}
                initialBody={existingNote?.body ?? ""}
              />
            </div>
          </div>

          {todaysNotes.length > 0 ? (
            <div>
              <h3 className="text-sm uppercase tracking-[0.18em] text-muted">
                Also today
              </h3>
              <ul className="mt-3 space-y-3">
                {todaysNotes.map((note) => (
                  <li key={note.id}>
                    <Link
                      href={`/myday?domain=${note.domain}&type=${note.content_type}`}
                      className="block border border-line px-4 py-3 transition hover:border-accent"
                    >
                      <p className="text-sm text-foreground">
                        {domainLabel(note.domain)} · {note.content_type}
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm text-muted">
                        {note.body.trim() || "Empty note"}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>

        <aside className="animate-rise-late space-y-8">
          <div>
            <div className="flex items-end justify-between gap-3">
              <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-foreground">
                Feed pulse
              </h2>
              <Link href="/feeds" className="text-sm text-accent hover:underline">
                All feeds
              </Link>
            </div>
            <ul className="mt-5 space-y-4">
              {news.length === 0 ? (
                <li className="border border-line px-4 py-5 text-sm text-muted">
                  No feed items available right now. Check back later or open
                  Feeds to retry.
                </li>
              ) : (
                news.map((item) => (
                  <li key={item.url} className="border-b border-line/70 pb-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted">
                      {domainLabel(item.domain)} · {item.source} ·{" "}
                      {formatRelativeTime(item.publishedAt)}
                    </p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 block text-foreground transition hover:text-accent"
                    >
                      {item.title}
                    </a>
                    {item.summary ? (
                      <p className="mt-1 line-clamp-2 text-sm text-muted">
                        {item.summary}
                      </p>
                    ) : null}
                  </li>
                ))
              )}
            </ul>
          </div>

          <div>
            <div className="flex items-end justify-between gap-3">
              <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-foreground">
                Programs
              </h2>
              <Link
                href="/programs"
                className="text-sm text-accent hover:underline"
              >
                Hub
              </Link>
            </div>
            <ul className="mt-5 space-y-3">
              {PROGRAMS.map((program) => (
                <li key={program.id} className="border border-line px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted">
                    {program.status}
                  </p>
                  <p className="mt-1 text-foreground">{program.title}</p>
                  <p className="mt-1 text-sm text-muted">{program.summary}</p>
                  {program.external ? (
                    <a
                      href={program.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block text-sm text-accent hover:underline"
                    >
                      Open program
                    </a>
                  ) : (
                    <Link
                      href={program.href}
                      className="mt-3 inline-block text-sm text-accent hover:underline"
                    >
                      {program.status === "live" ? "Enter course" : "View status"}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </AppChrome>
  );
}
