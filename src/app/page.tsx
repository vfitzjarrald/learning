export default function Home() {
  return (
    <div className="relative isolate flex min-h-screen flex-col overflow-hidden">
      <div
        aria-hidden
        className="bg-drift pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 18% 20%, rgba(61,214,198,0.22), transparent 42%), radial-gradient(circle at 82% 12%, rgba(88,126,255,0.18), transparent 36%), linear-gradient(160deg, #07101c 0%, #0b1220 48%, #101b2e 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(157,176,201,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(157,176,201,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(circle at center, black 35%, transparent 78%)",
        }}
      />

      <header className="animate-rise mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-8 sm:px-10">
        <p className="font-[family-name:var(--font-display)] text-xl tracking-tight text-foreground sm:text-2xl">
          Learning
        </p>
        <p className="text-sm text-muted">victorfitzjarrald.com</p>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 pb-24 pt-8 sm:px-10">
        <p className="animate-rise mb-5 text-sm uppercase tracking-[0.22em] text-accent">
          Victor Fitzjarrald
        </p>
        <h1 className="animate-rise-delay max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[1.05] tracking-tight text-foreground sm:text-7xl">
          A quiet place to learn in public.
        </h1>
        <p className="animate-rise-late mt-6 max-w-xl text-lg leading-8 text-muted">
          Notes, experiments, and project write-ups live here as this workspace
          grows.
        </p>

        <div className="animate-rise-late mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#topics"
            className="inline-flex items-center justify-center bg-accent px-5 py-3 text-sm font-semibold text-[#041018] transition hover:brightness-110"
          >
            Browse topics
          </a>
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

      <section
        id="topics"
        className="mx-auto w-full max-w-5xl border-t border-line px-6 py-16 sm:px-10"
      >
        <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-foreground">
          Coming soon
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          This site is wired for{" "}
          <span className="text-foreground">learning.victorfitzjarrald.com</span>
          . Content will land here as lessons and projects take shape.
        </p>
      </section>
    </div>
  );
}
