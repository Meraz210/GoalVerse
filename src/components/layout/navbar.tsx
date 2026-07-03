"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FiHeart,
  FiMenu,
  FiSearch,
  FiShield,
  FiX,
} from "react-icons/fi";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Live", href: "/live" },
  { label: "Fixtures", href: "/fixtures" },
  { label: "Leagues", href: "/leagues" },
  { label: "Favorites", href: "/favorites" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/86 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="GoalVerse home"
          onClick={() => setIsOpen(false)}
        >
          <span className="grid size-10 place-items-center rounded bg-accent text-background">
            <FiShield className="size-5" aria-hidden="true" />
          </span>
          <span className="font-display text-xl font-bold tracking-normal">
            GoalVerse
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-muted hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/search"
            className="grid size-10 place-items-center rounded border border-border text-muted transition hover:border-white/20 hover:text-white"
            aria-label="Search"
          >
            <FiSearch className="size-5" aria-hidden="true" />
          </Link>
          <Link
            href="/favorites"
            className="grid size-10 place-items-center rounded border border-border text-muted transition hover:border-white/20 hover:text-white"
            aria-label="Favorites"
          >
            <FiHeart className="size-5" aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          className="grid size-10 place-items-center rounded border border-border text-white lg:hidden"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? (
            <FiX className="size-5" aria-hidden="true" />
          ) : (
            <FiMenu className="size-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t border-border bg-background px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {[...navItems, { label: "Search", href: "/search" }].map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded px-3 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-muted hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </header>
  );
}
