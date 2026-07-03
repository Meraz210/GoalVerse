import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { players } from "@/lib/mock-football";

export const metadata: Metadata = {
  title: "Players",
  description: "Browse player profiles and performance snapshots.",
};

export default function PlayersPage() {
  return (
    <PageShell
      eyebrow="Players"
      title="Player Profiles"
      description="Track player roles, ratings, goals, assists, and team context."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {players.map((player) => (
          <Link
            key={player.id}
            href={`/players/${player.id}`}
            className="rounded border border-border bg-panel p-5 transition hover:border-accent/40"
          >
            <p className="text-xs font-black uppercase tracking-[0.12em] text-accent">
              {player.position}
            </p>
            <h2 className="mt-2 font-display text-2xl font-black text-white">
              {player.name}
            </h2>
            <p className="mt-2 text-sm text-muted">{player.team}</p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
