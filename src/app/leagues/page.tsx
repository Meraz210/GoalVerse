import type { Metadata } from "next";
import { PageShell } from "@/components/ui/page-shell";
import { standings } from "@/lib/mock-football";

export const metadata: Metadata = {
  title: "Leagues",
  description: "Explore football leagues and current standings.",
};

export default function LeaguesPage() {
  return (
    <PageShell
      eyebrow="Leagues"
      title="League Standings"
      description="A clean standings table ready for live API data integration."
    >
      <div className="overflow-hidden rounded border border-border bg-panel/90">
        <div className="grid grid-cols-[1fr_48px_48px_48px_48px_56px_64px] gap-2 border-b border-border px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-muted">
          <span>Club</span>
          <span>P</span>
          <span>W</span>
          <span>D</span>
          <span>L</span>
          <span>GD</span>
          <span>PTS</span>
        </div>
        {standings.map((row, index) => (
          <div
            key={row.id}
            className="grid grid-cols-[1fr_48px_48px_48px_48px_56px_64px] gap-2 border-b border-border px-4 py-4 text-sm text-white last:border-b-0"
          >
            <span className="font-black">
              <span className="mr-3 text-muted">{index + 1}</span>
              {row.team}
            </span>
            <span>{row.played}</span>
            <span>{row.won}</span>
            <span>{row.drawn}</span>
            <span>{row.lost}</span>
            <span>{row.gd}</span>
            <span className="font-black text-accent">{row.points}</span>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
