"use client";

import { FiRefreshCw } from "react-icons/fi";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="mx-auto grid min-h-[70vh] w-full max-w-3xl place-items-center px-4 py-12 text-center">
      <div className="rounded border border-danger/30 bg-danger/10 p-8">
        <h1 className="font-display text-3xl font-black text-white">
          Something went wrong
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          GoalVerse could not load this section. Retry the request.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded bg-accent px-5 py-3 text-sm font-black text-background"
        >
          <FiRefreshCw className="size-4" aria-hidden="true" />
          Retry
        </button>
      </div>
    </section>
  );
}
