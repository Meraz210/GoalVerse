"use client";

import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { searchableItems } from "@/lib/mock-football";

export function SearchClient() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term) {
      return searchableItems;
    }

    return searchableItems.filter((item) =>
      `${item.name} ${item.subtitle} ${item.type}`.toLowerCase().includes(term),
    );
  }, [query]);

  return (
    <div className="rounded border border-border bg-panel/90 p-4">
      <label className="flex min-h-12 items-center gap-3 rounded border border-border bg-background px-4">
        <FiSearch className="size-5 text-muted" aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search teams, players, and leagues"
          className="w-full bg-transparent text-sm font-bold text-white outline-none placeholder:text-muted"
        />
      </label>

      <div className="mt-4 grid gap-3">
        {results.map((item) => (
          <article
            key={item.id}
            className="rounded border border-border bg-panel-strong p-4"
          >
            <div className="text-xs font-black uppercase tracking-[0.12em] text-accent">
              {item.type}
            </div>
            <h2 className="mt-1 font-display text-xl font-black text-white">
              {item.name}
            </h2>
            <p className="mt-1 text-sm text-muted">{item.subtitle}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
