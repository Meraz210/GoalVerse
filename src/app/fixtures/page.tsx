import type { Metadata } from "next";
import { FixtureSchedule } from "@/components/home/fixture-schedule";
import { PageShell } from "@/components/ui/page-shell";
import { matches } from "@/lib/mock-football";

export const metadata: Metadata = {
  title: "Fixtures",
  description: "Browse upcoming football fixtures and match schedules.",
};

export default function FixturesPage() {
  return (
    <PageShell
      eyebrow="Schedule"
      title="Fixtures"
      description="Use date chips to move between matchdays and upcoming games."
    >
      <FixtureSchedule matches={matches} />
    </PageShell>
  );
}
