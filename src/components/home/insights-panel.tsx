import { FiBarChart2, FiStar, FiTrendingUp } from "react-icons/fi";
import type { Highlight, Match } from "@/types/football";

type InsightsPanelProps = {
  matches: Match[];
  highlights: Highlight[];
};

export function InsightsPanel({ matches, highlights }: InsightsPanelProps) {
  const liveCount = matches.filter((match) => match.state === "live").length;
  const scheduledCount = matches.filter((match) => match.state === "scheduled").length;

  return (
    <aside className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <MetricCard icon={<FiTrendingUp />} label="Live" value={String(liveCount)} />
        <MetricCard icon={<FiBarChart2 />} label="Fixtures" value={String(scheduledCount)} />
      </div>

      <section className="rounded border border-border bg-panel/90 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
              Highlights
            </p>
            <h2 className="mt-1 font-display text-xl font-black text-white">
              Matchday Pulse
            </h2>
          </div>
          <FiStar className="size-5 text-warning" aria-hidden="true" />
        </div>

        <div className="mt-4 grid gap-3">
          {highlights.map((highlight) => (
            <article
              key={highlight.id}
              className="rounded border border-border bg-panel-strong p-3 transition hover:border-accent/40"
            >
              <div className="flex items-center justify-between gap-2 text-[10px] font-black uppercase tracking-[0.12em] text-muted">
                <span>{highlight.competition}</span>
                <span className="rounded bg-white/8 px-2 py-1 text-accent">
                  {highlight.tag}
                </span>
              </div>
              <h3 className="mt-3 text-sm font-black leading-5 text-white">
                {highlight.title}
              </h3>
              <p className="mt-2 text-xs font-medium text-muted">{highlight.time}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded border border-accent/30 bg-accent/10 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
          Favorites
        </p>
        <h2 className="mt-2 font-display text-lg font-black text-white">
          Pin teams and leagues for faster matchday tracking.
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          The next build step can connect this panel to localStorage favorites.
        </p>
      </section>
    </aside>
  );
}

function MetricCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded border border-border bg-panel p-4">
      <div className="text-accent [&>svg]:size-5">{icon}</div>
      <div className="mt-4 font-display text-3xl font-black text-white">{value}</div>
      <div className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-muted">
        {label}
      </div>
    </div>
  );
}
