import type { Metadata } from "next";
import { SearchClient } from "@/components/search/search-client";
import { PageShell } from "@/components/ui/page-shell";

export const metadata: Metadata = {
  title: "Search",
  description: "Search teams, players, and leagues in GoalVerse.",
};

export default function SearchPage() {
  return (
    <PageShell
      eyebrow="Search"
      title="Search GoalVerse"
      description="Find teams, players, and leagues from one fast search surface."
    >
      <SearchClient />
    </PageShell>
  );
}
