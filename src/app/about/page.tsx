import type { Metadata } from "next";
import { PageShell } from "@/components/ui/page-shell";

export const metadata: Metadata = {
  title: "About",
  description: "About GoalVerse football live score app.",
};

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="About GoalVerse"
      description="GoalVerse is a premium football live score dashboard built with Next.js, TypeScript, Tailwind CSS, Framer Motion, Axios, and React Icons."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {["Live scores", "Fixtures", "Standings"].map((feature) => (
          <div key={feature} className="rounded border border-border bg-panel p-5">
            <h2 className="font-display text-xl font-black text-white">{feature}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Built as a reusable section ready for real football API integration.
            </p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
