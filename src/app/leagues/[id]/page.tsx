import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailCard } from "@/components/profile/detail-card";
import { PageShell } from "@/components/ui/page-shell";
import { leagues, standings } from "@/lib/mock-football";

type LeaguePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: LeaguePageProps): Promise<Metadata> {
  const { id } = await params;
  const league = leagues.find((item) => item.id === id);

  return {
    title: league ? league.name : "League Details",
    description: league
      ? `${league.name} standings, season, teams, and league information.`
      : "League details.",
  };
}

export default async function LeaguePage({ params }: LeaguePageProps) {
  const { id } = await params;
  const league = leagues.find((item) => item.id === id);

  if (!league) {
    notFound();
  }

  return (
    <PageShell
      eyebrow={league.country}
      title={league.name}
      description={`${league.tier} league table and season overview.`}
    >
      <div className="mb-5 grid gap-4 md:grid-cols-3">
        <DetailCard label="Season" value={league.season} />
        <DetailCard label="Teams" value={league.teams} />
        <DetailCard label="Country" value={league.country} />
      </div>

      <div className="overflow-hidden rounded border border-border bg-panel/90">
        {standings.map((row, index) => (
          <div
            key={row.id}
            className="grid grid-cols-[1fr_64px] border-b border-border px-4 py-4 text-sm last:border-b-0"
          >
            <span className="font-black text-white">
              <span className="mr-3 text-muted">{index + 1}</span>
              {row.team}
            </span>
            <span className="text-right font-black text-accent">{row.points}</span>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
