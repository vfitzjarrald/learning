import Link from "next/link";
import { logoutAction } from "@/app/actions";
import type { SessionUser } from "@/lib/auth";

const NAV = [
  { href: "/myday", label: "MyDay" },
  { href: "/feeds", label: "Feeds" },
  { href: "/notes", label: "Notes" },
  { href: "/programs", label: "Programs" },
];

export function AppChrome({
  session,
  active,
  children,
}: {
  session: SessionUser;
  active: "myday" | "feeds" | "notes" | "programs";
  children: React.ReactNode;
}) {
  return (
    <div className="relative isolate min-h-screen">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 12% 10%, rgba(61,214,198,0.16), transparent 40%), linear-gradient(160deg, #07101c 0%, #0b1220 50%, #101b2e 100%)",
        }}
      />
      <header className="border-b border-line/70">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5 sm:px-10">
          <div className="flex items-center gap-6">
            <Link
              href="/myday"
              className="font-[family-name:var(--font-display)] text-xl tracking-tight text-foreground"
            >
              Learning
            </Link>
            <nav className="flex flex-wrap items-center gap-1 text-sm">
              {NAV.map((item) => {
                const isActive = item.label.toLowerCase() === active;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={
                      isActive
                        ? "px-3 py-1.5 text-accent"
                        : "px-3 py-1.5 text-muted transition hover:text-foreground"
                    }
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted">{session.displayName ?? session.username}</span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="border border-line px-3 py-1.5 text-muted transition hover:border-accent hover:text-accent"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-10">{children}</main>
    </div>
  );
}
