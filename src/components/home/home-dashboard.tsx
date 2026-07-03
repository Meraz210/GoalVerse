"use client";

import { useState } from "react";
import { FixtureSchedule } from "@/components/home/fixture-schedule";
import { InsightsPanel } from "@/components/home/insights-panel";
import { LiveMatchCenter } from "@/components/home/live-match-center";
import {
  type DashboardTab,
  MobileSectionTabs,
} from "@/components/home/mobile-section-tabs";
import { highlights, matches } from "@/lib/mock-football";

export function HomeDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("live");

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <MobileSectionTabs activeTab={activeTab} onChange={setActiveTab} />

        <div className="mt-5 grid gap-5 lg:mt-0 lg:grid-cols-[minmax(0,1.18fr)_minmax(330px,0.82fr)]">
          <div className={activeTab === "live" ? "block" : "hidden lg:block"}>
            <LiveMatchCenter matches={matches} />
          </div>

          <div className="grid gap-5">
            <div className={activeTab === "fixtures" ? "block" : "hidden lg:block"}>
              <FixtureSchedule matches={matches} />
            </div>
            <div className={activeTab === "insights" ? "block" : "hidden lg:block"}>
              <InsightsPanel matches={matches} highlights={highlights} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
