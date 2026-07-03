import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailCard } from "@/components/profile/detail-card";
import { PageShell } from "@/components/ui/page-shell";
import { teams } from "@/lib/mock-football";

type TeamPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: TeamPageProps): Promise<Metadata> {
  const { id } = await params;
  const team = teams.find((item) => item.id === id);

  return {
    title: team ? team.name : "Team Details",
    description: team
      ? `${team.name} profile, form, stadium, manager, and league details.`
      : "Team profile details.",
  };
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { id } = await params;
  const team = teams.find((item) => item.id === id);

  if (!team) {
    notFound();
  }

  return (
    <PageShell
      eyebrow={team.league}
      title={team.name}
      description={`${team.country} club founded in ${team.founded}, managed by ${team.manager}.`}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DetailCard label="Stadium" value={team.stadium} />
        <DetailCard label="Manager" value={team.manager} />
        <DetailCard label="Founded" value={team.founded} />
        <DetailCard label="Form" value={team.form.join(" ")} />
      </div>
    </PageShell>
  );
}
