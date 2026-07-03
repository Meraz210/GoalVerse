import Link from "next/link";
import { FiActivity, FiGithub, FiHeart } from "react-icons/fi";

const footerLinks = [
  { label: "Live Matches", href: "/live" },
  { label: "Watch", href: "/watch" },
  { label: "World Cup", href: "/world-cup" },
  { label: "Fixtures", href: "/fixtures" },
  { label: "Leagues", href: "/leagues" },
  { label: "Search", href: "/search" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded bg-white/10 text-accent">
              <FiActivity className="size-5" aria-hidden="true" />
            </span>
            <span className="font-display text-lg font-bold">GoalVerse</span>
          </div>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            A modern football match center for live scores, fixtures,
            standings, match details, teams, players, and favorites.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted md:justify-end">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded px-2 py-1 transition hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} GoalVerse. All rights reserved.</span>
          <span className="flex items-center gap-2">
            Built for football fans
            <FiHeart className="size-4 text-accent" aria-hidden="true" />
            <FiGithub className="size-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </footer>
  );
}
