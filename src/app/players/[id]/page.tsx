import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailCard } from "@/components/profile/detail-card";
import { PageShell } from "@/components/ui/page-shell";
import { players } from "@/lib/mock-football";

type PlayerPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PlayerPageProps): Promise<Metadata> {
  const { id } = await params;
  const player = players.find((item) => item.id === id);

  return {
    title: player ? player.name : "Player Details",
    description: player
      ? `${player.name} profile, position, goals, assists, rating, and team details.`
      : "Player profile details.",
  };
}

export default async function PlayerPage({ params }: PlayerPageProps) {
  const { id } = await params;
  const player = players.find((item) => item.id === id);

  if (!player) {
    notFound();
  }

  return (
    <PageShell
      eyebrow={player.position}
      title={player.name}
      description={`${player.country} international playing for ${player.team}.`}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DetailCard label="Age" value={player.age} />
        <DetailCard label="Goals" value={player.goals} />
        <DetailCard label="Assists" value={player.assists} />
        <DetailCard label="Rating" value={player.rating} />
      </div>
    </PageShell>
  );
}
