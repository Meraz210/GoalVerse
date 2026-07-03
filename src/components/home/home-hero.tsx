"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiArrowRight,
  FiBarChart2,
  FiCalendar,
  FiClock,
  FiStar,
} from "react-icons/fi";

const liveMatches = [
  {
    minute: "67'",
    league: "Premier League",
    home: "Northbridge FC",
    away: "London City",
    score: "2 - 1",
    status: "Attacking pressure",
  },
  {
    minute: "HT",
    league: "LaLiga",
    home: "Valencia Norte",
    away: "Madrid Union",
    score: "0 - 0",
    status: "Half-time analysis",
  },
  {
    minute: "23'",
    league: "Serie A",
    home: "Torino Verde",
    away: "Roma Club",
    score: "1 - 1",
    status: "VAR check complete",
  },
];

const metrics = [
  { label: "Live matches", value: "128" },
  { label: "Leagues", value: "54" },
  { label: "Tracked teams", value: "1.2k" },
];

export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 rounded border border-accent/30 bg-accent/10 px-3 py-2 text-sm font-medium text-accent">
            <span className="size-2 rounded-full bg-accent" />
            Live football intelligence
          </div>

          <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.04] tracking-normal text-white sm:text-6xl lg:text-7xl">
            Follow every match before the scoreline tells the story.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            GoalVerse brings live scores, fixtures, standings, lineups, events,
            statistics, teams, players, search, and favorites into one fast
            match center.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/live"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-accent px-5 text-sm font-bold text-background transition hover:bg-accent-strong"
            >
              View Live Matches
              <FiArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/fixtures"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded border border-border px-5 text-sm font-bold text-white transition hover:border-white/20 hover:bg-white/5"
            >
              Browse Fixtures
              <FiCalendar className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="border-l border-border pl-4">
                <div className="font-display text-2xl font-bold text-white">
                  {metric.value}
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-muted">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
          className="relative"
        >
          <div className="rounded border border-border bg-panel/90 p-3 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="flex items-center justify-between border-b border-border px-2 pb-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                  Match Center
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold text-white">
                  Live Now
                </h2>
              </div>
              <div className="flex items-center gap-2 rounded bg-danger/15 px-3 py-2 text-sm font-bold text-danger">
                <FiClock className="size-4" aria-hidden="true" />
                Live
              </div>
            </div>

            <div className="grid gap-3 pt-3">
              {liveMatches.map((match) => (
                <article
                  key={`${match.home}-${match.away}`}
                  className="rounded border border-border bg-panel-strong p-4 transition hover:border-accent/40"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs text-muted">
                        <span className="rounded bg-white/8 px-2 py-1 font-bold text-accent">
                          {match.minute}
                        </span>
                        <span className="truncate">{match.league}</span>
                      </div>
                      <div className="mt-3 grid gap-2 text-sm font-semibold text-white">
                        <span className="truncate">{match.home}</span>
                        <span className="truncate">{match.away}</span>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="font-display text-2xl font-bold text-white">
                        {match.score}
                      </div>
                      <div className="mt-2 text-xs text-muted">{match.status}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded border border-border bg-white/[0.04] p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <FiBarChart2 className="size-4 text-accent" aria-hidden="true" />
                  Shot Map
                </div>
                <div className="mt-4 h-24 rounded bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px]" />
              </div>
              <div className="rounded border border-border bg-white/[0.04] p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <FiStar className="size-4 text-warning" aria-hidden="true" />
                  Favorite Watch
                </div>
                <p className="mt-4 text-sm leading-6 text-muted">
                  Pin teams, leagues, and players for a faster matchday view.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
