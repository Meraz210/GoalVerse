"use client";

import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { searchableItems } from "@/lib/mock-football";

const storageKey = "goalverse:favorites";

export function FavoritesClient() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    setFavoriteIds(stored ? JSON.parse(stored) : []);
  }, []);

  function toggleFavorite(id: string) {
    setFavoriteIds((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
      window.localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  }

  return (
    <div className="grid gap-3">
      {searchableItems.map((item) => {
        const active = favoriteIds.includes(item.id);

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => toggleFavorite(item.id)}
            className={`flex items-center justify-between rounded border p-4 text-left transition ${
              active
                ? "border-accent bg-accent/10"
                : "border-border bg-panel hover:border-white/20"
            }`}
          >
            <span>
              <span className="block text-xs font-black uppercase tracking-[0.12em] text-accent">
                {item.type}
              </span>
              <span className="mt-1 block font-display text-lg font-black text-white">
                {item.name}
              </span>
              <span className="mt-1 block text-sm text-muted">{item.subtitle}</span>
            </span>
            <FiHeart
              className={`size-5 ${active ? "fill-accent text-accent" : "text-muted"}`}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
}
