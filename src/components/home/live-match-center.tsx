"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiActivity, FiArrowRight, FiClock, FiRadio } from "react-icons/fi";
import type { Match } from "@/types/football";
import { TeamCrest } from "@/components/home/team-crest";

type LiveMatchCenterProps = {
  matches: Match[];
};

export function LiveMatchCenter({ matches }: LiveMatchCenterProps) {
  const featuredMatch = matches.find((match) => match.state === "live") ?? matches[0];
  const liveMatches = matches.filter((match) => match.state === "live");

  return (
    <section className="space-y-4">
      <div className="rounded border border-border bg-panel/90 p-4 shadow-2xl shadow-black/30 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
              Match Center
            </p>
            <h1 className="mt-2 font-display text-3xl font-black leading-tight text-white sm:text-4xl">
              Live football, fixtures, and match intelligence.
            </h1>
          </div>
          <span className="inline-flex items-center gap-2 rounded bg-danger/15 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-danger">
            <span className="size-2 rounded-full bg-danger" />
            Live
          </span>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mt-4 rounded border border-accent/30 bg-[linear-gradient(145deg,rgba(41,211,145,0.14),rgba(17,26,42,0.95))] p-4"
        >
          <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.12em] text-muted">
            <span>{featuredMatch.league}</span>
            <span className="inline-flex items-center gap-1 text-danger">
              <FiRadio className="size-3.5" aria-hidden="true" />
              {featuredMatch.statusText}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <TeamBlock matchTeam={featuredMatch.home} align="right" />
            <div className="rounded bg-background px-4 py-3 text-center shadow-lg shadow-black/20">
              <div className="font-display text-3xl font-black tabular-nums text-white">
                {featuredMatch.home.score ?? 0}
                <span className="mx-2 text-muted">-</span>
                {featuredMatch.away.score ?? 0}
              </div>
              <div className="mt-1 text-xs font-bold text-accent">
                {featuredMatch.minute}
              </div>
            </div>
            <TeamBlock matchTeam={featuredMatch.away} align="left" />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <StatPill label="Possession" value={`${featuredMatch.stats.possession[0]}%`} />
            <StatPill label="Shots" value={String(featuredMatch.stats.shots[0])} />
            <StatPill label="Attacks" value={String(featuredMatch.stats.attacks[0])} />
          </div>
        </motion.article>
      </div>

      <div className="grid gap-3">
        {liveMatches.map((match) => (
          <article
            key={match.id}
            className="rounded border border-border bg-panel-strong p-4 transition hover:border-accent/40"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-muted">
                  <span className="rounded bg-danger/15 px-2 py-1 text-danger">
                    {match.minute}
                  </span>
                  <span className="truncate">{match.league}</span>
                </div>
                <div className="mt-3 grid gap-2 text-sm font-bold text-white">
                  <TeamRow team={match.home} />
                  <TeamRow team={match.away} />
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="font-display text-2xl font-black tabular-nums text-white">
                  {match.home.score} - {match.away.score}
                </div>
                <div className="mt-2 inline-flex items-center gap-1 text-xs text-muted">
                  <FiClock className="size-3.5" aria-hidden="true" />
                  {match.statusText}
                </div>
              </div>
            </div>
            <Link
              href={`/matches/${match.id}`}
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-accent transition hover:text-white"
            >
              Match details
              <FiArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function TeamBlock({
  matchTeam,
  align,
}: {
  matchTeam: Match["home"];
  align: "left" | "right";
}) {
  return (
    <div
      className={`flex items-center gap-3 ${
        align === "right" ? "justify-end text-right" : "justify-start text-left"
      }`}
    >
      {align === "right" ? (
        <>
          <span className="min-w-0 truncate text-sm font-black text-white sm:text-base">
            {matchTeam.name}
          </span>
          <TeamCrest team={matchTeam} />
        </>
      ) : (
        <>
          <TeamCrest team={matchTeam} />
          <span className="min-w-0 truncate text-sm font-black text-white sm:text-base">
            {matchTeam.name}
          </span>
        </>
      )}
    </div>
  );
}

function TeamRow({ team }: { team: Match["home"] }) {
  return (
    <span className="flex min-w-0 items-center gap-2">
      <span
        className="size-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: team.color }}
      />
      <span className="truncate">{team.name}</span>
    </span>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-white/10 bg-background/60 p-3">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-muted">
        <FiActivity className="size-3.5 text-accent" aria-hidden="true" />
        {label}
      </div>
      <div className="mt-2 font-display text-2xl font-black text-white">{value}</div>
    </div>
  );
}
