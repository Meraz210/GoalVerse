import type { Metadata } from "next";
import { FavoritesClient } from "@/components/favorites/favorites-client";
import { PageShell } from "@/components/ui/page-shell";

export const metadata: Metadata = {
  title: "Favorites",
  description: "Manage favorite teams, players, and leagues saved locally.",
};

export default function FavoritesPage() {
  return (
    <PageShell
      eyebrow="Favorites"
      title="Favorites"
      description="Save teams, players, and leagues in localStorage for quick access."
    >
      <FavoritesClient />
    </PageShell>
  );
}
