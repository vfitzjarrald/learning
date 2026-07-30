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

function clearSessionCookie(response: NextResponse) {
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

async function hasValidSessionToken(token: string | undefined) {
  if (!token) return false;
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    // If the signing secret is unavailable in the proxy runtime, defer to
    // page-level getSession. Failing closed here loops with the login page
    // auto-redirect when Node has the secret but Edge does not.
    return Boolean(token);
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

  if (path === "/login" || !isPrivatePath(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const valid = await hasValidSessionToken(token);
  if (valid) {
    return NextResponse.next();
  }

  // Build an absolute login URL. Cloning nextUrl and rewriting pathname has
  // interacted badly with platform redirects for /programs in the past.
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", path);

  const response = NextResponse.redirect(loginUrl);
  if (token) {
    clearSessionCookie(response);
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
