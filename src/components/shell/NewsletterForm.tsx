"use client";

import { useActionState, useId } from "react";
import { ArrowRight } from "lucide-react";
import { subscribe, type NewsletterState } from "@/app/actions/newsletter";

const initial: NewsletterState = { status: "idle", message: "" };

export default function NewsletterForm({ className = "" }: { className?: string }) {
  const [state, action, pending] = useActionState(subscribe, initial);
  const inputId = useId();
  const messageId = useId();

  return (
    <form action={action} className={className} noValidate>
      <label htmlFor={inputId} className="label mb-3 block text-stone">
        Email address
      </label>
      <div className="flex items-center gap-3 border-b border-current pb-3">
        <input
          id={inputId}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@somewhere.far"
          aria-describedby={messageId}
          aria-invalid={state.status === "error" || undefined}
          className="min-w-0 flex-1 bg-transparent font-serif text-step-2 placeholder:text-current placeholder:opacity-40 focus:outline-none"
        />
        <button type="submit" className="btn btn-solid shrink-0" disabled={pending}>
          {pending ? "Sending" : "Subscribe"}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
      <p id={messageId} aria-live="polite" className={`mt-3 min-h-[1.5em] text-step--1 ${state.status === "error" ? "text-ember" : "text-stone"}`}>
        {state.message}
      </p>
    </form>
  );
}
