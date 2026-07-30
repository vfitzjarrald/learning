import { NEWS_FEEDS, type NewsFeed } from "@/config/feeds";
import type { DomainSlug } from "@/config/domains";

export type NewsItem = {
  title: string;
  source: string;
  url: string;
  publishedAt: string | null;
  summary: string;
  domain: DomainSlug;
};

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

function plainText(value: string) {
  return decodeXml(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function field(block: string, names: string[]) {
  for (const name of names) {
    const match = block.match(
      new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, "i"),
    );
    if (match?.[1]) return match[1];
  }
  return "";
}

function atomLink(block: string) {
  const match =
    block.match(
      /<link[^>]+rel=["']alternate["'][^>]+href=["']([^"']+)["']/i,
    ) ?? block.match(/<link[^>]+href=["']([^"']+)["'][^>]*>/i);
  return match?.[1] ?? "";
}

export function parseNewsFeed(
  xml: string,
  feed: NewsFeed,
): NewsItem[] {
  const blocks = [
    ...xml.matchAll(/<(item|entry)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/gi),
  ].map((match) => match[2]);

  return blocks
    .map((block) => {
      const title = plainText(field(block, ["title"]));
      const url = plainText(field(block, ["link"])) || atomLink(block);
      const publishedRaw = plainText(
        field(block, ["pubDate", "published", "updated", "dc:date"]),
      );
      const description = plainText(
        field(block, ["description", "summary", "content", "content:encoded"]),
      );
      const date = publishedRaw ? new Date(publishedRaw) : null;
      return {
        title,
        source: feed.name,
        url,
        publishedAt:
          date && !Number.isNaN(date.getTime()) ? date.toISOString() : null,
        summary:
          description.length > 280
            ? `${description.slice(0, 277).trimEnd()}…`
            : description,
        domain: feed.domain,
      };
    })
    .filter((item) => item.title && /^https?:\/\//.test(item.url));
}

async function fetchFeed(feed: NewsFeed) {
  const response = await fetch(feed.url, {
    headers: { "User-Agent": "Learning-MyDay/1.0" },
    next: { revalidate: 60 * 60 * 6 },
    signal: AbortSignal.timeout(6000),
  });
  if (!response.ok) throw new Error(`${feed.name} returned ${response.status}`);
  return parseNewsFeed(await response.text(), feed);
}

export async function getDomainNews(opts?: {
  domains?: DomainSlug[];
  limit?: number;
}): Promise<NewsItem[]> {
  const limit = opts?.limit ?? 12;
  const feeds = opts?.domains?.length
    ? NEWS_FEEDS.filter((feed) => opts.domains?.includes(feed.domain))
    : NEWS_FEEDS;

  const results = await Promise.allSettled(feeds.map(fetchFeed));
  const deduped = new Map<string, NewsItem>();

  for (const result of results) {
    if (result.status !== "fulfilled") continue;
    for (const item of result.value) {
      const key =
        item.url.replace(/\/$/, "").toLowerCase() || item.title.toLowerCase();
      if (!deduped.has(key)) deduped.set(key, item);
    }
  }

  return [...deduped.values()]
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
    .slice(0, limit);
}
