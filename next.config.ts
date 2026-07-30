import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Do not add /Programs → /programs redirects here: Vercel can match
  // redirect sources case-insensitively and create a loop for /programs.
  // Casing normalization is handled in src/proxy.ts instead.
};

export default nextConfig;