import Link from "next/link";
import { redirect } from "next/navigation";
import { Atmosphere } from "@/components/Atmosphere";
import { LoginForm } from "@/components/LoginForm";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

function safeNextPath(value: string | undefined | null) {
  if (!value) return null;
  if (!value.startsWith("/")) return null;
  if (value.startsWith("//")) return null;
  if (value.startsWith("/login")) return null;
  return value;
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = safeNextPath(params.next) ?? "/myday";

  const session = await getSession();
  if (session) {
    redirect(nextPath);
  }

  return (
    <div className="relative isolate flex min-h-screen flex-col overflow-hidden">
      <Atmosphere />
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-8 sm:px-10">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-xl tracking-tight text-foreground sm:text-2xl"
        >
          Learning
        </Link>
        <p className="text-sm text-muted">Private workspace</p>
      </header>
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 pb-24">
        <p className="mb-3 text-sm uppercase tracking-[0.22em] text-accent">
          Admin sign in
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-tight text-foreground">
          Enter MyDay
        </h1>
        <p className="mt-3 mb-8 text-muted">
          Notes and feeds are private to your admin account.
        </p>
        <LoginForm nextPath={nextPath} />
      </main>
    </div>
  );
}
