import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/ui/page-shell";
import { matches } from "@/lib/mock-football";

type MatchDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: MatchDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const match = matches.find((item) => item.id === id);

  return {
    title: match ? `${match.home.name} vs ${match.away.name}` : "Match Details",
    description: match
      ? `${match.league} match details, score, statistics, venue, and events.`
      : "Football match details.",
  };
}

export default async function MatchDetailsPage({ params }: MatchDetailsPageProps) {
  const { id } = await params;
  const match = matches.find((item) => item.id === id);

  if (!match) {
    notFound();
  }

  return (
    <PageShell
      eyebrow={match.league}
      title={`${match.home.name} vs ${match.away.name}`}
      description={`${match.round} at ${match.venue}. Status: ${match.statusText}.`}
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <section className="rounded border border-border bg-panel/90 p-5">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <h2 className="text-right font-display text-2xl font-black text-white">
              {match.home.name}
            </h2>
            <div className="rounded bg-background px-5 py-3 font-display text-3xl font-black text-white">
              {match.state === "scheduled"
                ? "VS"
                : `${match.home.score ?? 0} - ${match.away.score ?? 0}`}
            </div>
            <h2 className="font-display text-2xl font-black text-white">
              {match.away.name}
            </h2>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Stat label="Possession" home={match.stats.possession[0]} away={match.stats.possession[1]} suffix="%" />
            <Stat label="Shots" home={match.stats.shots[0]} away={match.stats.shots[1]} />
            <Stat label="Attacks" home={match.stats.attacks[0]} away={match.stats.attacks[1]} />
          </div>
        </section>

        <aside className="rounded border border-border bg-panel/90 p-5">
          <h2 className="font-display text-xl font-black text-white">Events</h2>
          <div className="mt-4 grid gap-3">
            {match.events.map((event) => (
              <div
                key={event}
                className="rounded border border-border bg-panel-strong px-3 py-2 text-sm font-bold text-white"
              >
                {event}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </PageShell>
  );
}

function Stat({
  label,
  home,
  away,
  suffix = "",
}: {
  label: string;
  home: number;
  away: number;
  suffix?: string;
}) {
  return (
    <div className="rounded border border-border bg-panel-strong p-4">
      <p className="text-xs font-black uppercase tracking-[0.12em] text-muted">
        {label}
      </p>
      <div className="mt-3 flex items-center justify-between font-display text-2xl font-black text-white">
        <span>
          {home}
          {suffix}
        </span>
        <span className="text-muted">-</span>
        <span>
          {away}
          {suffix}
        </span>
      </div>
    </div>
  );
}
