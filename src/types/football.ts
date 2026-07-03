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

export type Highlight = {
  id: string;
  title: string;
  competition: string;
  time: string;
  tag: string;
};
