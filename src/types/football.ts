export type MatchState = "live" | "scheduled" | "finished";

export type TeamSide = {
  name: string;
  shortName: string;
  color: string;
  score?: number;
};

export type Match = {
  id: string;
  league: string;
  round: string;
  date: string;
  day: string;
  time: string;
  minute?: string;
  statusText: string;
  state: MatchState;
  home: TeamSide;
  away: TeamSide;
  venue: string;
  stats: {
    possession: [number, number];
    shots: [number, number];
    attacks: [number, number];
  };
  events: string[];
};

export type WorldCupSource = "api" | "fallback";

export type Highlight = {
  id: string;
  title: string;
  competition: string;
  time: string;
  tag: string;
};

export type TeamProfile = {
  id: string;
  name: string;
  shortName: string;
  league: string;
  country: string;
  stadium: string;
  manager: string;
  founded: number;
  color: string;
  form: string[];
};

export type PlayerProfile = {
  id: string;
  name: string;
  team: string;
  position: string;
  country: string;
  age: number;
  goals: number;
  assists: number;
  rating: number;
};

export type LeagueProfile = {
  id: string;
  name: string;
  country: string;
  tier: string;
  season: string;
  teams: number;
  color: string;
};
