import type { Match, MatchState, WorldCupSource } from "@/types/football";

type EspnCompetitor = {
  homeAway?: "home" | "away";
  score?: string;
  team?: {
    abbreviation?: string;
    color?: string;
    displayName?: string;
    name?: string;
    shortDisplayName?: string;
  };
};

type EspnEvent = {
  id?: string;
  date?: string;
  name?: string;
  shortName?: string;
  status?: {
    type?: {
      detail?: string;
      shortDetail?: string;
      state?: string;
    };
  };
  competitions?: {
    competitors?: EspnCompetitor[];
    venue?: {
      fullName?: string;
    };
  }[];
};

type EspnScoreboard = {
  events?: EspnEvent[];
};

export type WorldCupResponse = {
  matches: Match[];
  source: WorldCupSource;
};

const worldCupEndpoint =
  "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260719&limit=400";

export async function getWorldCupMatches(): Promise<WorldCupResponse> {
  try {
    const response = await fetch(worldCupEndpoint, {
      next: { revalidate: 60 },
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`ESPN scoreboard responded with ${response.status}`);
    }

    const data = (await response.json()) as EspnScoreboard;
    const matches = (data.events ?? []).map(mapEspnEvent).filter(Boolean) as Match[];

    return {
      matches: matches.length > 0 ? matches : worldCupFallbackMatches,
      source: matches.length > 0 ? "api" : "fallback",
    };
  } catch {
    return {
      matches: worldCupFallbackMatches,
      source: "fallback",
    };
  }
}

function mapEspnEvent(event: EspnEvent): Match | null {
  const competitors = event.competitions?.[0]?.competitors ?? [];
  const home = competitors.find((competitor) => competitor.homeAway === "home");
  const away = competitors.find((competitor) => competitor.homeAway === "away");

  if (!home?.team || !away?.team) {
    return null;
  }

  const date = event.date ? new Date(event.date) : null;
  const state = mapState(event.status?.type?.state);
  const statusText =
    event.status?.type?.shortDetail ?? event.status?.type?.detail ?? "Scheduled";

  return {
    id: `wc-${event.id ?? `${home.team.abbreviation}-${away.team.abbreviation}`}`,
    league: "FIFA World Cup 2026",
    round: event.name ?? event.shortName ?? "World Cup match",
    date: date
      ? date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      : "TBD",
    day: date
      ? date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()
      : "TBD",
    time: state === "live" ? statusText : formatTime(date),
    minute: state === "live" ? statusText : undefined,
    statusText,
    state,
    home: {
      name: home.team.displayName ?? home.team.name ?? "Home",
      shortName: home.team.abbreviation ?? home.team.shortDisplayName ?? "HOM",
      color: normalizeColor(home.team.color, "#29d391"),
      score: home.score ? Number(home.score) : undefined,
    },
    away: {
      name: away.team.displayName ?? away.team.name ?? "Away",
      shortName: away.team.abbreviation ?? away.team.shortDisplayName ?? "AWY",
      color: normalizeColor(away.team.color, "#8aa4ff"),
      score: away.score ? Number(away.score) : undefined,
    },
    venue: event.competitions?.[0]?.venue?.fullName ?? "World Cup venue",
    stats: {
      possession: [0, 0],
      shots: [0, 0],
      attacks: [0, 0],
    },
    events: [statusText],
  };
}

function mapState(state?: string): MatchState {
  if (state === "in") {
    return "live";
  }

  if (state === "post") {
    return "finished";
  }

  return "scheduled";
}

function formatTime(date: Date | null) {
  if (!date) {
    return "TBD";
  }

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function normalizeColor(color: string | undefined, fallback: string) {
  if (!color) {
    return fallback;
  }

  return color.startsWith("#") ? color : `#${color}`;
}

export const worldCupFallbackMatches: Match[] = [
  {
    id: "wc-fallback-001",
    league: "FIFA World Cup 2026",
    round: "Group Stage",
    date: "Jun 11",
    day: "THU",
    time: "20:00",
    statusText: "Scheduled",
    state: "scheduled",
    home: { name: "Mexico", shortName: "MEX", color: "#16a34a" },
    away: { name: "South Africa", shortName: "RSA", color: "#facc15" },
    venue: "Estadio Azteca",
    stats: { possession: [0, 0], shots: [0, 0], attacks: [0, 0] },
    events: ["Opening match"],
  },
  {
    id: "wc-fallback-002",
    league: "FIFA World Cup 2026",
    round: "Group Stage",
    date: "Jun 12",
    day: "FRI",
    time: "18:00",
    statusText: "Scheduled",
    state: "scheduled",
    home: { name: "United States", shortName: "USA", color: "#2563eb" },
    away: { name: "Wales", shortName: "WAL", color: "#dc2626" },
    venue: "SoFi Stadium",
    stats: { possession: [0, 0], shots: [0, 0], attacks: [0, 0] },
    events: ["Group stage fixture"],
  },
  {
    id: "wc-fallback-003",
    league: "FIFA World Cup 2026",
    round: "Group Stage",
    date: "Jun 13",
    day: "SAT",
    time: "21:00",
    statusText: "Scheduled",
    state: "scheduled",
    home: { name: "Canada", shortName: "CAN", color: "#ef4444" },
    away: { name: "Japan", shortName: "JPN", color: "#38bdf8" },
    venue: "BC Place",
    stats: { possession: [0, 0], shots: [0, 0], attacks: [0, 0] },
    events: ["Group stage fixture"],
  },
  {
    id: "wc-fallback-004",
    league: "FIFA World Cup 2026",
    round: "Knockout Stage",
    date: "Jul 4",
    day: "SAT",
    time: "TBD",
    statusText: "To be confirmed",
    state: "scheduled",
    home: { name: "Round of 32 Winner", shortName: "W32", color: "#29d391" },
    away: { name: "Round of 32 Winner", shortName: "W32", color: "#8aa4ff" },
    venue: "World Cup venue",
    stats: { possession: [0, 0], shots: [0, 0], attacks: [0, 0] },
    events: ["Knockout pairing pending"],
  },
];
