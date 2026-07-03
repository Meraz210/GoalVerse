import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { teams } from "@/lib/mock-football";

export const metadata: Metadata = {
  title: "Teams",
  description: "Browse football team profiles in GoalVerse.",
};

export default function TeamsPage() {
  return (
    <PageShell
      eyebrow="Teams"
      title="Team Directory"
      description="Explore club profiles, form, venues, and squad context."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {teams.map((team) => (
          <Link
            key={team.id}
            href={`/teams/${team.id}`}
            className="rounded border border-border bg-panel p-5 transition hover:border-accent/40"
          >
            <div
              className="grid size-12 place-items-center rounded text-sm font-black text-white"
              style={{ backgroundColor: team.color }}
            >
              {team.shortName}
            </div>
            <h2 className="mt-4 font-display text-2xl font-black text-white">
              {team.name}
            </h2>
            <p className="mt-2 text-sm text-muted">{team.league}</p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
