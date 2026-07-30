import { jwtVerify } from "jose";
import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_NAME } from "@/lib/constants";

const PRIVATE_ROOTS = ["myday", "feeds", "notes", "programs"] as const;

function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function isPrivatePath(pathname: string) {
  const path = normalizePath(pathname);
  return PRIVATE_ROOTS.some(
    (root) => path === `/${root}` || path.startsWith(`/${root}/`),
  );
}

async function hasValidSessionToken(token: string | undefined) {
  if (!token) return false;
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    // If secret isn't available in proxy runtime, fall back to presence check.
    return true;
  }
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
    );
    return Boolean(payload.sub) && payload.role === "admin";
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const path = normalizePath(pathname);

  if (path === "/login") {
    return NextResponse.next();
  }

  if (!isPrivatePath(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const valid = await hasValidSessionToken(token);
  if (valid) {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/login";
  loginUrl.search = "";
  loginUrl.searchParams.set("next", path);

  const response = NextResponse.redirect(loginUrl);
  if (token) {
    // Drop stale/invalid cookies so pages and proxy agree.
    response.cookies.delete(COOKIE_NAME);
  }
  return response;
}

export const config = {
  matcher: [
    "/myday",
    "/myday/:path*",
    "/feeds",
    "/feeds/:path*",
    "/notes",
    "/notes/:path*",
    "/programs",
    "/programs/:path*",
  ],
};
