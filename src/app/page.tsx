import type { Metadata } from "next";
import { HomeDashboard } from "@/components/home/home-dashboard";

export const metadata: Metadata = {
  title: "Live Football Scores, Fixtures and Standings",
  description:
    "Follow live football scores, upcoming fixtures, league tables, match events, team pages, and player profiles with GoalVerse.",
};

export default function Home() {
  return <HomeDashboard />;
}
