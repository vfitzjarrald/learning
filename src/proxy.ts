import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_NAME } from "@/lib/constants";

const PRIVATE_ROOTS = ["myday", "feeds", "notes", "programs"] as const;

function privatePathInfo(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;
  const root = segments[0];
  const rootLower = root.toLowerCase();
  if (!PRIVATE_ROOTS.includes(rootLower as (typeof PRIVATE_ROOTS)[number])) {
    return null;
  }
  const rest = segments.slice(1).join("/");
  const canonical = rest ? `/${rootLower}/${rest}` : `/${rootLower}`;
  return {
    rootLower,
    canonical,
    needsCanonicalRedirect: pathname !== canonical,
  };
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const info = privatePathInfo(pathname);
  if (!info) return NextResponse.next();

  if (info.needsCanonicalRedirect) {
    const url = request.nextUrl.clone();
    url.pathname = info.canonical;
    return NextResponse.redirect(url);
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", info.canonical);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Include common casing variants so /Programs/... is handled before a static 404.
  matcher: [
    "/myday",
    "/myday/:path*",
    "/MyDay",
    "/MyDay/:path*",
    "/feeds",
    "/feeds/:path*",
    "/Feeds",
    "/Feeds/:path*",
    "/notes",
    "/notes/:path*",
    "/Notes",
    "/Notes/:path*",
    "/programs",
    "/programs/:path*",
    "/Programs",
    "/Programs/:path*",
  ],
};
