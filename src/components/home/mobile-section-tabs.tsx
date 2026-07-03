"use client";

import type { Dispatch, SetStateAction } from "react";

export type DashboardTab = "live" | "fixtures" | "insights";

const tabs: { id: DashboardTab; label: string }[] = [
  { id: "live", label: "Live" },
  { id: "fixtures", label: "Fixtures" },
  { id: "insights", label: "Insights" },
];

type MobileSectionTabsProps = {
  activeTab: DashboardTab;
  onChange: Dispatch<SetStateAction<DashboardTab>>;
};

export function MobileSectionTabs({
  activeTab,
  onChange,
}: MobileSectionTabsProps) {
  return (
    <div className="grid grid-cols-3 gap-2 rounded border border-border bg-panel p-1 lg:hidden">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`min-h-10 rounded text-sm font-bold transition ${
            activeTab === tab.id
              ? "bg-accent text-background"
              : "text-muted hover:bg-white/5 hover:text-white"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
