import Link from "next/link";
import { redirect } from "next/navigation";
import { AppChrome } from "@/components/AppChrome";
import { DOMAINS, domainLabel, isDomainSlug, type DomainSlug } from "@/config/domains";
import { NEWS_FEEDS } from "@/config/feeds";
import { getSession } from "@/lib/auth";
import { formatRelativeTime } from "@/lib/dates";
import { getDomainNews } from "@/lib/news";

export const dynamic = "force-dynamic";

export default async function FeedsPage({
  searchParams,
}: {
  searchParams: Promise<{ domain?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login?next=/feeds");

  const params = await searchParams;
  const domainFilter =
    params.domain && isDomainSlug(params.domain) ? params.domain : null;
  const domains = domainFilter ? ([domainFilter] as DomainSlug[]) : undefined;
  const news = await getDomainNews({ domains, limit: 40 });
  const sources = domainFilter
    ? NEWS_FEEDS.filter((feed) => feed.domain === domainFilter)
    : NEWS_FEEDS;

  return (
    <AppChrome session={session} active="feeds">
      <section className="mb-8">
        <p className="text-sm uppercase tracking-[0.22em] text-accent">Feeds</p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight text-foreground">
          Domain news
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          RSS and Atom sources across your expertise domains. Failed feeds are
          skipped automatically.
        </p>
      </section>

      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/feeds"
          className={
            !domainFilter
              ? "border border-accent bg-accent-soft px-3 py-1.5 text-sm text-accent"
              : "border border-line px-3 py-1.5 text-sm text-muted transition hover:border-accent hover:text-accent"
          }
        >
          All
        </Link>
        {DOMAINS.map((domain) => (
          <Link
            key={domain.slug}
            href={`/feeds?domain=${domain.slug}`}
            className={
              domainFilter === domain.slug
                ? "border border-accent bg-accent-soft px-3 py-1.5 text-sm text-accent"
                : "border border-line px-3 py-1.5 text-sm text-muted transition hover:border-accent hover:text-accent"
            }
          >
            {domain.name}
          </Link>
        ))}
      </div>

      <p className="mb-6 text-sm text-muted">
        Tracking {sources.length} source{sources.length === 1 ? "" : "s"}
        {domainFilter ? ` in ${domainLabel(domainFilter)}` : ""}.
      </p>

      <ul className="space-y-5">
        {news.length === 0 ? (
          <li className="border border-line px-5 py-8 text-muted">
            No items returned for this filter.
          </li>
        ) : (
          news.map((item) => (
            <li key={item.url} className="border-b border-line/70 pb-5">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">
                {domainLabel(item.domain)} · {item.source} ·{" "}
                {formatRelativeTime(item.publishedAt)}
              </p>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block text-lg text-foreground transition hover:text-accent"
              >
                {item.title}
              </a>
              {item.summary ? (
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
                  {item.summary}
                </p>
              ) : null}
              <Link
                href={`/myday?domain=${item.domain}&type=rss`}
                className="mt-3 inline-block text-sm text-accent hover:underline"
              >
                Note in MyDay
              </Link>
            </li>
          ))
        )}
      </ul>
    </AppChrome>
  );
}
