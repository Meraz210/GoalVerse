import type { Metadata } from "next";
import { HomeHero } from "@/components/home/home-hero";

export const metadata: Metadata = {
  title: "Live Football Scores, Fixtures and Standings",
  description:
    "Follow live football scores, upcoming fixtures, league tables, match events, team pages, and player profiles with GoalVerse.",
};

export default function Home() {
  return <HomeHero />;
}
