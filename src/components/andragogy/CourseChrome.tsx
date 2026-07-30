import Link from "next/link";
import type { SessionUser } from "@/lib/auth";

const NAV = [
  { href: "/programs/andragogy", label: "My Day", key: "home" },
  { href: "/programs/andragogy/schedule", label: "Schedule", key: "schedule" },
  { href: "/programs/andragogy/checks", label: "Checks", key: "checks" },
  {
    href: "/programs/andragogy/diagnostics",
    label: "Diagnostics",
    key: "diagnostics",
  },
  {
    href: "/programs/andragogy/achievements",
    label: "Achievements",
    key: "achievements",
  },
  { href: "/programs/andragogy/gates", label: "Gates", key: "gates" },
] as const;

export function CourseChrome({
  session,
  active,
  children,
}: {
  session: SessionUser;
  active: (typeof NAV)[number]["key"];
  children: React.ReactNode;
}) {
  return (
    <div className="relative isolate min-h-screen">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 14% 8%, rgba(61,214,198,0.14), transparent 38%), linear-gradient(160deg, #07101c 0%, #0b1220 52%, #121c2f 100%)",
        }}
      />
      <header className="border-b border-line/70">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5 sm:px-10">
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/programs/andragogy"
              className="font-[family-name:var(--font-display)] text-xl tracking-tight text-foreground"
            >
              Andragogy Expert
            </Link>
            <nav className="flex flex-wrap items-center gap-1 text-sm">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    item.key === active
                      ? "px-3 py-1.5 text-accent"
                      : "px-3 py-1.5 text-muted transition hover:text-foreground"
                  }
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted">
              {session.displayName ?? session.username}
            </span>
            <Link
              href="/programs"
              className="border border-line px-3 py-1.5 text-muted transition hover:border-accent hover:text-accent"
            >
              Hub
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-10">{children}</main>
    </div>
  );
}
