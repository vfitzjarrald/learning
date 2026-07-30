import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly empty: never add /Programs → /programs redirects.
  // Next/Vercel can match redirect sources case-insensitively, so a
  // "/Programs" rule also matches "/programs" and redirects to itself
  // (ERR_TOO_MANY_REDIRECTS) before proxy auth runs.
  async redirects() {
    return [];
  },
};

export default nextConfig;
