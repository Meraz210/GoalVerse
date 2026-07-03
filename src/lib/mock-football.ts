import type { Highlight, Match } from "@/types/football";

export const matches: Match[] = [
  {
    id: "gv-001",
    league: "Premier League",
    round: "Matchday 28",
    date: "Today",
    day: "SAT",
    time: "68'",
    minute: "68'",
    statusText: "Live pressure",
    state: "live",
    home: {
      name: "Northbridge FC",
      shortName: "NBR",
      color: "#29d391",
      score: 2,
    },
    away: {
      name: "London City",
      shortName: "LNC",
      color: "#8aa4ff",
      score: 1,
    },
    venue: "Northbridge Arena",
    stats: {
      possession: [58, 42],
      shots: [13, 7],
      attacks: [46, 31],
    },
    events: ["Goal 61' R. Santos", "Yellow 54' M. Cole", "Goal 22' A. Reid"],
  },
  {
    id: "gv-002",
    league: "LaLiga",
    round: "Matchday 23",
    date: "Today",
    day: "SAT",
    time: "HT",
    minute: "HT",
    statusText: "Half-time",
    state: "live",
    home: {
      name: "Valencia Norte",
      shortName: "VNO",
      color: "#f6c85f",
      score: 0,
    },
    away: {
      name: "Madrid Union",
      shortName: "MDU",
      color: "#ff5b6e",
      score: 0,
    },
    venue: "Estadio Norte",
    stats: {
      possession: [49, 51],
      shots: [5, 6],
      attacks: [22, 27],
    },
    events: ["Save 38' D. Silva", "VAR check 19' No penalty"],
  },
  {
    id: "gv-003",
    league: "Serie A",
    round: "Matchday 21",
    date: "Tomorrow",
    day: "SUN",
    time: "20:45",
    statusText: "Scheduled",
    state: "scheduled",
    home: {
      name: "Torino Verde",
      shortName: "TVE",
      color: "#22c55e",
    },
    away: {
      name: "Roma Club",
      shortName: "ROM",
      color: "#f97316",
    },
    venue: "Verde Park",
    stats: {
      possession: [0, 0],
      shots: [0, 0],
      attacks: [0, 0],
    },
    events: ["Lineups expected 60 minutes before kick-off"],
  },
  {
    id: "gv-004",
    league: "Bundesliga",
    round: "Matchday 19",
    date: "Mon, Jul 6",
    day: "MON",
    time: "18:30",
    statusText: "Scheduled",
    state: "scheduled",
    home: {
      name: "Munich Athletic",
      shortName: "MUN",
      color: "#ef4444",
    },
    away: {
      name: "Berlin 04",
      shortName: "B04",
      color: "#38bdf8",
    },
    venue: "Bavaria Stadium",
    stats: {
      possession: [0, 0],
      shots: [0, 0],
      attacks: [0, 0],
    },
    events: ["Top-of-table clash"],
  },
];

export const highlights: Highlight[] = [
  {
    id: "hl-001",
    title: "Northbridge turn momentum with a second-half press",
    competition: "Premier League",
    time: "8 min ago",
    tag: "Analysis",
  },
  {
    id: "hl-002",
    title: "Madrid Union held after two first-half chances",
    competition: "LaLiga",
    time: "21 min ago",
    tag: "Recap",
  },
  {
    id: "hl-003",
    title: "Five fixtures to track across Europe this weekend",
    competition: "Weekend guide",
    time: "Today",
    tag: "Preview",
  },
];

export const standings = [
  { id: "nbr", team: "Northbridge FC", played: 28, won: 19, drawn: 5, lost: 4, gd: 32, points: 62 },
  { id: "lnc", team: "London City", played: 28, won: 18, drawn: 6, lost: 4, gd: 29, points: 60 },
  { id: "mdu", team: "Madrid Union", played: 23, won: 14, drawn: 7, lost: 2, gd: 24, points: 49 },
  { id: "vno", team: "Valencia Norte", played: 23, won: 11, drawn: 6, lost: 6, gd: 12, points: 39 },
  { id: "rom", team: "Roma Club", played: 21, won: 10, drawn: 4, lost: 7, gd: 8, points: 34 },
];

export const searchableItems = [
  { id: "team-nbr", type: "Team", name: "Northbridge FC", subtitle: "Premier League" },
  { id: "team-lnc", type: "Team", name: "London City", subtitle: "Premier League" },
  { id: "team-mdu", type: "Team", name: "Madrid Union", subtitle: "LaLiga" },
  { id: "player-santos", type: "Player", name: "Rafael Santos", subtitle: "Forward, Northbridge FC" },
  { id: "player-reid", type: "Player", name: "Aaron Reid", subtitle: "Midfielder, London City" },
  { id: "league-epl", type: "League", name: "Premier League", subtitle: "England" },
  { id: "league-laliga", type: "League", name: "LaLiga", subtitle: "Spain" },
];
