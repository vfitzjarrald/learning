import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_NAME } from "@/lib/constants";

const PRIVATE_PREFIXES = ["/myday", "/feeds", "/notes", "/programs"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPrivate = PRIVATE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  if (!isPrivate) return NextResponse.next();

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/myday/:path*", "/feeds/:path*", "/notes/:path*", "/programs/:path*"],
};
