import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/Programs",
        destination: "/programs",
        permanent: false,
      },
      {
        source: "/Programs/:path*",
        destination: "/programs/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
