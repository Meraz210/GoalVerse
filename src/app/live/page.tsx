import type { Metadata } from "next";
import { LiveMatchCenter } from "@/components/home/live-match-center";
import { PageShell } from "@/components/ui/page-shell";
import { matches } from "@/lib/mock-football";

export const metadata: Metadata = {
  title: "Live Matches",
  description: "Follow every live football match currently tracked by GoalVerse.",
};

export default function LiveMatchesPage() {
  return (
    <PageShell
      eyebrow="Live"
      title="Live Matches"
      description="Track live scores, status, momentum, and quick match details."
    >
      <LiveMatchCenter matches={matches} />
    </PageShell>
  );
}
