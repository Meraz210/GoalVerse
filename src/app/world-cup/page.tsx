import type { Metadata } from "next";
import { PageShell } from "@/components/ui/page-shell";
import { WorldCupBoard } from "@/components/world-cup/world-cup-board";
import { getWorldCupMatches } from "@/services/world-cup";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "World Cup 2026",
  description:
    "Follow FIFA World Cup 2026 live scores, match schedule, venues, and match status on GoalVerse.",
};

export default async function WorldCupPage() {
  const { matches, source } = await getWorldCupMatches();

  return (
    <PageShell
      eyebrow="Tournament"
      title="World Cup 2026"
      description="Follow every World Cup 2026 match with live score status, fixtures, venues, and schedule filters."
    >
      <WorldCupBoard matches={matches} source={source} />
    </PageShell>
  );
}
