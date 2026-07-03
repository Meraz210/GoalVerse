import Link from "next/link";
import { FiArrowLeft, FiTarget } from "react-icons/fi";

export default function NotFound() {
  return (
    <section className="mx-auto grid min-h-[70vh] w-full max-w-3xl place-items-center px-4 py-12 text-center">
      <div className="rounded border border-border bg-panel p-8">
        <FiTarget className="mx-auto size-12 text-accent" aria-hidden="true" />
        <h1 className="mt-5 font-display text-4xl font-black text-white">
          Page Missed the Goal
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          The page you opened is not available yet. Return to the live match
          center and keep tracking the game.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded bg-accent px-5 py-3 text-sm font-black text-background"
        >
          <FiArrowLeft className="size-4" aria-hidden="true" />
          Back to Home
        </Link>
      </div>
    </section>
  );
}
