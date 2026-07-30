import Link from "next/link";
import { redirect } from "next/navigation";
import { AppChrome } from "@/components/AppChrome";
import { domainLabel } from "@/config/domains";
import { PROGRAMS } from "@/config/programs";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ProgramsPage() {
  const session = await getSession();
  if (!session) redirect("/login?next=/programs");

  return (
    <AppChrome session={session} active="programs">
      <section className="mb-10">
        <p className="text-sm uppercase tracking-[0.22em] text-accent">
          Programs
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight text-foreground">
          Learning microsites
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          Deep learning programs live here as microsites. The AI Expert course
          links out; Andragogy Expert runs in this hub; Product Management is
          next.
        </p>
      </section>

      <ul className="space-y-6">
        {PROGRAMS.map((program) => (
          <li
            key={program.id}
            id={program.id}
            className="scroll-mt-24 border border-line px-6 py-6"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-muted">
              {program.status}
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl tracking-tight text-foreground">
              {program.title}
            </h2>
            <p className="mt-3 max-w-2xl text-muted">{program.summary}</p>
            <p className="mt-4 text-sm text-muted">
              Domains:{" "}
              {program.domains.map((slug) => domainLabel(slug)).join(" · ")}
            </p>
            <div className="mt-5">
              {program.external ? (
                <a
                  href={program.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center bg-accent px-5 py-3 text-sm font-semibold text-[#041018] transition hover:brightness-110"
                >
                  Open The AI Expert
                </a>
              ) : program.status === "live" ? (
                <Link
                  href={program.href}
                  className="inline-flex items-center justify-center bg-accent px-5 py-3 text-sm font-semibold text-[#041018] transition hover:brightness-110"
                >
                  Enter {program.title}
                </Link>
              ) : program.status === "next" ? (
                <p className="text-sm text-accent">Next up after Andragogy.</p>
              ) : (
                <p className="text-sm text-muted">Planned.</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-sm text-muted">
        Return to{" "}
        <Link href="/myday" className="text-accent hover:underline">
          MyDay
        </Link>{" "}
        to keep daily notes while studying a program.
      </p>
    </AppChrome>
  );
}
