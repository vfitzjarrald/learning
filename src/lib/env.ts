/** Resolve Neon / Vercel Marketplace Postgres connection string. */
export function getDatabaseUrl() {
  return (
    process.env.DATABASE_URL?.trim() ||
    process.env.POSTGRES_URL?.trim() ||
    process.env.POSTGRES_PRISMA_URL?.trim() ||
    ""
  );
}

export function hasRemoteDatabase() {
  const url = getDatabaseUrl();
  return Boolean(url) && !url.includes("placeholder");
}
