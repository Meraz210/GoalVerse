"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FiCalendar, FiRadio, FiShield } from "react-icons/fi";
import { TeamCrest } from "@/components/home/team-crest";
import type { Match, WorldCupSource } from "@/types/football";

type WorldCupBoardProps = {
  matches: Match[];
  source: WorldCupSource;
};

const filters = ["All", "Live", "Today", "Upcoming", "Finished"] as const;

export function WorldCupBoard({ matches, source }: WorldCupBoardProps) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");

  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      if (activeFilter === "Live") {
        return match.state === "live";
      }

      if (activeFilter === "Today") {
        return match.date === "Today";
      }

      if (activeFilter === "Upcoming") {
        return match.state === "scheduled";
      }

      if (activeFilter === "Finished") {
        return match.state === "finished";
      }

      return true;
    });
  }, [activeFilter, matches]);

  const liveCount = matches.filter((match) => match.state === "live").length;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section className="rounded border border-border bg-panel/90 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-accent">
              FIFA World Cup 2026
            </p>
            <h2 className="mt-1 font-display text-2xl font-black text-white">
              All Matches
            </h2>
          </div>
          <span className="rounded bg-white/8 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-muted">
            {source === "api" ? "Live API" : "Fallback data"}
          </span>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`min-h-10 rounded border px-4 text-sm font-black transition ${
                activeFilter === filter
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-background/50 text-muted hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-3">
          {filteredMatches.map((match) => (
            <article
              key={match.id}
              className={`rounded border p-4 transition ${
                match.state === "live"
                  ? "border-danger/40 bg-danger/10"
                  : "border-border bg-panel-strong hover:border-white/20"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-black uppercase tracking-[0.12em] text-muted">
                <span>{match.round}</span>
                <span
                  className={`inline-flex items-center gap-2 ${
                    match.state === "live" ? "text-danger" : "text-accent"
                  }`}
                >
                  {match.state === "live" ? (
                    <FiRadio className="size-3.5" aria-hidden="true" />
                  ) : (
                    <FiCalendar className="size-3.5" aria-hidden="true" />
                  )}
                  {match.statusText}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                <Team team={match.home} align="right" />
                <div className="rounded bg-background px-3 py-2 text-center font-display text-lg font-black text-white">
                  {match.state === "scheduled"
                    ? match.time
                    : `${match.home.score ?? 0} - ${match.away.score ?? 0}`}
                </div>
                <Team team={match.away} align="left" />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
                <span>{match.date}</span>
                <span>{match.venue}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="space-y-4">
        <div className="rounded border border-border bg-panel p-4">
          <FiShield className="size-5 text-accent" aria-hidden="true" />
          <div className="mt-4 font-display text-3xl font-black text-white">
            {matches.length}
          </div>
          <p className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-muted">
            Matches Loaded
          </p>
        </div>

        <div className="rounded border border-border bg-panel p-4">
          <FiRadio className="size-5 text-danger" aria-hidden="true" />
          <div className="mt-4 font-display text-3xl font-black text-white">
            {liveCount}
          </div>
          <p className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-muted">
            Live Now
          </p>
        </div>

        <div className="rounded border border-accent/30 bg-accent/10 p-4">
          <h2 className="font-display text-lg font-black text-white">
            Live scores only
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            GoalVerse can show live match data. Official video streams need
            licensed broadcast rights.
          </p>
          <Link
            href="/live"
            className="mt-4 inline-flex rounded bg-accent px-4 py-2 text-sm font-black text-background"
          >
            Open Live Center
          </Link>
        </div>
      </aside>
    </div>
  );
}

function Team({
  team,
  align,
}: {
  team: Match["home"];
  align: "left" | "right";
}) {
  return (
    <div
      className={`flex min-w-0 items-center gap-2 ${
        align === "right" ? "justify-end text-right" : "justify-start text-left"
      }`}
    >
      {align === "right" ? (
        <>
          <span className="truncate text-sm font-black text-white">{team.name}</span>
          <TeamCrest team={team} />
        </>
      ) : (
        <>
          <TeamCrest team={team} />
          <span className="truncate text-sm font-black text-white">{team.name}</span>
        </>
      )}
    </div>
  );
}
