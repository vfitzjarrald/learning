import Link from "next/link";
import { Atmosphere } from "@/components/Atmosphere";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function Home() {
  let signedIn = false;
  try {
    signedIn = Boolean(await getSession());
  } catch {
    signedIn = false;
  }

  return (
    <div className="relative isolate flex min-h-screen flex-col overflow-hidden">
      <Atmosphere />

      <header className="animate-rise mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-8 sm:px-10">
        <p className="font-[family-name:var(--font-display)] text-xl tracking-tight text-foreground sm:text-2xl">
          Learning
        </p>
        <div className="flex items-center gap-4 text-sm">
          <p className="hidden text-muted sm:block">victorfitzjarrald.com</p>
          <Link
            href={signedIn ? "/myday" : "/login"}
            className="text-accent transition hover:underline"
          >
            {signedIn ? "Open MyDay" : "Sign in"}
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 pb-24 pt-8 sm:px-10">
        <p className="animate-rise mb-5 text-sm uppercase tracking-[0.22em] text-accent">
          Victor Fitzjarrald
        </p>
        <h1 className="animate-rise-delay max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[1.05] tracking-tight text-foreground sm:text-7xl">
          Learning
        </h1>
        <p className="animate-rise-late mt-6 max-w-xl text-lg leading-8 text-muted">
          A private hub to stay current, study feeds, and keep expert-level
          notes across AI, education, pedagogy, andragogy, content, product, and
          AI tooling.
        </p>

        <div className="animate-rise-late mt-10 flex flex-wrap items-center gap-4">
          <Link
            href={signedIn ? "/myday" : "/login"}
            className="inline-flex items-center justify-center bg-accent px-5 py-3 text-sm font-semibold text-[#041018] transition hover:brightness-110"
          >
            {signedIn ? "Continue MyDay" : "Enter MyDay"}
          </Link>
          <a
            href="https://victorfitzjarrald.com"
            className="inline-flex items-center justify-center border border-line px-5 py-3 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
          >
            Main site
          </a>
        </div>

        <div
          aria-hidden
          className="line-pulse mt-16 h-px w-full max-w-md bg-gradient-to-r from-transparent via-accent to-transparent"
        />
      </main>

      <section className="mx-auto w-full max-w-5xl border-t border-line px-6 py-16 sm:px-10">
        <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-foreground">
          Inside the hub
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          MyDay collates domain feeds and private notes. Programs link out to
          deep microsites — starting with The AI Expert, then Andragogy and
          Product Management.
        </p>
      </section>
    </div>
  );
}
