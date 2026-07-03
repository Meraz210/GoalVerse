"use client";

import { useMemo, useState } from "react";
import { FiCalendar, FiClock } from "react-icons/fi";
import type { Match } from "@/types/football";
import { TeamCrest } from "@/components/home/team-crest";

type FixtureScheduleProps = {
  matches: Match[];
};

export function FixtureSchedule({ matches }: FixtureScheduleProps) {
  const dates = useMemo(
    () => Array.from(new Set(matches.map((match) => match.date))),
    [matches],
  );
  const [selectedDate, setSelectedDate] = useState(dates[0] ?? "");
  const visibleMatches = matches.filter((match) => match.date === selectedDate);

  return (
    <section className="rounded border border-border bg-panel/90 p-4 backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
            Schedule
          </p>
          <h2 className="mt-1 font-display text-xl font-black text-white">
            Upcoming Fixtures
          </h2>
        </div>
        <FiCalendar className="size-5 text-accent" aria-hidden="true" />
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {dates.map((date) => {
          const active = date === selectedDate;

          return (
            <button
              key={date}
              type="button"
              onClick={() => setSelectedDate(date)}
              className={`min-w-24 rounded border px-3 py-2 text-left transition ${
                active
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-white/[0.03] text-muted hover:text-white"
              }`}
            >
              <span className="block text-xs font-black uppercase">
                {matches.find((match) => match.date === date)?.day}
              </span>
              <span className="block text-xs font-bold">{date}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid gap-3">
        {visibleMatches.map((match) => (
          <article
            key={match.id}
            className="rounded border border-border bg-panel-strong p-3"
          >
            <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.12em] text-muted">
              <span>{match.round}</span>
              <span
                className={`inline-flex items-center gap-1 ${
                  match.state === "live" ? "text-danger" : "text-accent"
                }`}
              >
                <FiClock className="size-3.5" aria-hidden="true" />
                {match.time}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <CompactTeam team={match.home} align="right" />
              <div className="rounded bg-background px-2 py-1 text-xs font-black text-muted">
                {match.state === "scheduled"
                  ? "VS"
                  : `${match.home.score ?? 0}-${match.away.score ?? 0}`}
              </div>
              <CompactTeam team={match.away} align="left" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CompactTeam({
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
          <span className="truncate text-xs font-black text-white">{team.shortName}</span>
          <TeamCrest team={team} />
        </>
      ) : (
        <>
          <TeamCrest team={team} />
          <span className="truncate text-xs font-black text-white">{team.shortName}</span>
        </>
      )}
    </div>
  );
}
