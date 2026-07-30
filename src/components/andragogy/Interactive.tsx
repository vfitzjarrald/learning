"use client";

import { useActionState, useState, useTransition } from "react";
import {
  saveAndragogyNoteAction,
  submitDiagnosticAction,
  submitQuizAction,
  toggleAndragogyDayAction,
  toggleGateItemAction,
  type ActionResult,
} from "@/app/programs/andragogy/actions";
import type { QuizQuestion } from "@/content/andragogy/checks";

export function CompleteToggle({
  week,
  day,
  completed,
}: {
  week: number;
  day: number;
  completed: boolean;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <form
      action={(fd) => {
        startTransition(async () => {
          await toggleAndragogyDayAction(fd);
        });
      }}
    >
      <input type="hidden" name="week" value={week} />
      <input type="hidden" name="day" value={day} />
      <input type="hidden" name="completed" value={completed ? "0" : "1"} />
      <button
        type="submit"
        disabled={pending}
        className={
          completed
            ? "border border-accent bg-accent-soft px-4 py-2 text-sm text-accent"
            : "bg-accent px-4 py-2 text-sm font-semibold text-[#041018]"
        }
      >
        {pending
          ? "Saving…"
          : completed
            ? "Mark incomplete"
            : "Mark complete"}
      </button>
    </form>
  );
}

export function DayNoteEditor({
  week,
  day,
  initialBody,
}: {
  week: number;
  day: number;
  initialBody: string;
}) {
  const [body, setBody] = useState(initialBody);
  const [state, formAction, pending] = useActionState(
    saveAndragogyNoteAction,
    null as ActionResult | null,
  );

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="week" value={week} />
      <input type="hidden" name="day" value={day} />
      <textarea
        name="body"
        value={body}
        onChange={(event) => setBody(event.target.value)}
        rows={8}
        placeholder="Private lesson notes…"
        className="w-full resize-y border border-line bg-[#0a1422] px-4 py-3 text-foreground outline-none focus:border-accent"
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="bg-accent px-4 py-2 text-sm font-semibold text-[#041018] disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save note"}
        </button>
        {state?.ok ? <p className="text-sm text-accent">Saved.</p> : null}
        {state && !state.ok ? (
          <p className="text-sm text-red-300">{state.error}</p>
        ) : null}
      </div>
    </form>
  );
}

export function QuizForm({
  scope,
  questions,
}: {
  scope: string;
  questions: Array<Omit<QuizQuestion, "choices"> & {
    choices: Array<{ letter: string; text: string }>;
  }>;
}) {
  const [state, formAction, pending] = useActionState(
    submitQuizAction,
    null as ActionResult | null,
  );

  return (
    <form action={formAction} className="space-y-8">
      <input type="hidden" name="scope" value={scope} />
      {questions.map((question) => (
        <fieldset key={question.id} className="border border-line p-5">
          <legend className="px-2 text-sm text-accent">
            Q{question.number}
          </legend>
          <p className="mt-2 text-foreground">{question.stem}</p>
          <div className="mt-4 space-y-2">
            {question.choices.map((choice) => (
              <label
                key={choice.letter}
                className="flex cursor-pointer items-start gap-3 text-sm text-muted"
              >
                <input
                  type="radio"
                  name={`answer_${question.id}`}
                  value={choice.letter}
                  required
                  className="mt-1"
                />
                <span>
                  <span className="text-foreground">{choice.letter})</span>{" "}
                  {choice.text}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      <button
        type="submit"
        disabled={pending}
        className="bg-accent px-5 py-3 text-sm font-semibold text-[#041018] disabled:opacity-60"
      >
        {pending ? "Scoring…" : "Submit knowledge check"}
      </button>
      {state?.ok ? (
        <p className="text-accent">{state.message}</p>
      ) : null}
      {state && !state.ok ? (
        <p className="text-red-300">{state.error}</p>
      ) : null}
    </form>
  );
}

export function DiagnosticForm({
  phase,
  kind,
  questions,
}: {
  phase: number;
  kind: "baseline" | "reassessment";
  questions: Array<{
    id: string;
    stem: string;
    choices: Array<{ letter: string; text: string }>;
  }>;
}) {
  const [state, formAction, pending] = useActionState(
    submitDiagnosticAction,
    null as ActionResult | null,
  );

  return (
    <form action={formAction} className="space-y-8">
      <input type="hidden" name="phase" value={phase} />
      <input type="hidden" name="kind" value={kind} />
      {questions.map((question, index) => (
        <fieldset key={question.id} className="border border-line p-5">
          <legend className="px-2 text-sm text-accent">Item {index + 1}</legend>
          <p className="mt-2 text-foreground">{question.stem}</p>
          <div className="mt-4 space-y-2">
            {question.choices.map((choice) => (
              <label
                key={choice.letter}
                className="flex cursor-pointer items-start gap-3 text-sm text-muted"
              >
                <input
                  type="radio"
                  name={`answer_${question.id}`}
                  value={choice.letter}
                  required
                  className="mt-1"
                />
                <span>
                  <span className="text-foreground">{choice.letter})</span>{" "}
                  {choice.text}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      <button
        type="submit"
        disabled={pending}
        className="bg-accent px-5 py-3 text-sm font-semibold text-[#041018] disabled:opacity-60"
      >
        {pending ? "Scoring…" : "Submit diagnostic"}
      </button>
      {state?.ok ? <p className="text-accent">{state.message}</p> : null}
      {state && !state.ok ? (
        <p className="text-red-300">{state.error}</p>
      ) : null}
    </form>
  );
}

export function GateItemToggle({
  phase,
  itemKey,
  label,
  done,
}: {
  phase: number;
  itemKey: string;
  label: string;
  done: boolean;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <form
      className="flex items-center justify-between gap-4 border border-line px-4 py-3"
      action={(fd) => {
        startTransition(async () => {
          await toggleGateItemAction(fd);
        });
      }}
    >
      <input type="hidden" name="phase" value={phase} />
      <input type="hidden" name="itemKey" value={itemKey} />
      <input type="hidden" name="done" value={done ? "0" : "1"} />
      <span className={done ? "text-accent" : "text-foreground"}>{label}</span>
      <button
        type="submit"
        disabled={pending}
        className="border border-line px-3 py-1.5 text-sm text-muted hover:border-accent hover:text-accent"
      >
        {pending ? "…" : done ? "Undo" : "Mark done"}
      </button>
    </form>
  );
}
