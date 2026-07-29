"use client";

import { useActionState, useState } from "react";
import { saveNoteAction, type ActionResult } from "@/app/actions";
import {
  CONTENT_TYPES,
  DOMAINS,
  type ContentTypeSlug,
  type DomainSlug,
} from "@/config/domains";

export function NoteEditor({
  noteDate,
  initialDomain,
  initialContentType,
  initialBody,
}: {
  noteDate: string;
  initialDomain: DomainSlug;
  initialContentType: ContentTypeSlug;
  initialBody: string;
}) {
  const [domain, setDomain] = useState(initialDomain);
  const [contentType, setContentType] = useState(initialContentType);
  const [body, setBody] = useState(initialBody);
  const [state, formAction, pending] = useActionState(
    saveNoteAction,
    null as ActionResult | null,
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="noteDate" value={noteDate} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block text-muted">Domain</span>
          <select
            name="domain"
            value={domain}
            onChange={(event) => setDomain(event.target.value as DomainSlug)}
            className="w-full border border-line bg-[#0a1422] px-3 py-2.5 text-foreground outline-none focus:border-accent"
          >
            {DOMAINS.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-2 block text-muted">Content type</span>
          <select
            name="contentType"
            value={contentType}
            onChange={(event) =>
              setContentType(event.target.value as ContentTypeSlug)
            }
            className="w-full border border-line bg-[#0a1422] px-3 py-2.5 text-foreground outline-none focus:border-accent"
          >
            {CONTENT_TYPES.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-2 block text-muted">Private note</span>
        <textarea
          name="body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          rows={10}
          placeholder="Capture what you’re studying, questions, and takeaways…"
          className="w-full resize-y border border-line bg-[#0a1422] px-4 py-3 text-foreground outline-none focus:border-accent"
        />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center bg-accent px-5 py-3 text-sm font-semibold text-[#041018] transition hover:brightness-110 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save note"}
        </button>
        {state?.ok ? (
          <p className="text-sm text-accent">{state.message ?? "Saved."}</p>
        ) : null}
        {state && !state.ok ? (
          <p className="text-sm text-red-300">{state.error}</p>
        ) : null}
      </div>
    </form>
  );
}
