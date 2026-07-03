import type { TeamSide } from "@/types/football";

type TeamCrestProps = {
  team: TeamSide;
};

export function TeamCrest({ team }: TeamCrestProps) {
  return (
    <span
      className="grid size-9 shrink-0 place-items-center rounded border border-white/10 text-xs font-black text-white shadow-lg"
      style={{
        background: `linear-gradient(135deg, ${team.color}, rgba(255,255,255,0.08))`,
      }}
      aria-hidden="true"
    >
      {team.shortName.slice(0, 2)}
    </span>
  );
}
