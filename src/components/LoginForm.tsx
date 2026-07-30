"use client";

import { useActionState } from "react";
import { loginAction, type ActionResult } from "@/app/actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    null as ActionResult | null,
  );

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label
          className="mb-2 block text-sm font-medium text-muted"
          htmlFor="username"
        >
          Username
        </label>
        <input
          id="username"
          name="username"
          autoComplete="username"
          required
          className="w-full border border-line bg-panel px-4 py-3 text-foreground outline-none transition focus:border-accent"
        />
      </div>
      <div>
        <label
          className="mb-2 block text-sm font-medium text-muted"
          htmlFor="password"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full border border-line bg-panel px-4 py-3 text-foreground outline-none transition focus:border-accent"
        />
      </div>
      {state && !state.ok ? (
        <p className="text-sm text-red-300">{state.error}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center bg-accent px-5 py-3 text-sm font-semibold text-[#041018] transition hover:brightness-110 disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
