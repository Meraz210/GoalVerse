"use client";

import { useEffect, useState } from "react";
import { ChannelList } from "@/components/stream/channel-list";
import { VideoPlayer } from "@/components/stream/video-player";
import { getChannels, type Channel } from "@/lib/api/channels";

export function StreamDashboard() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getChannels().then((items) => {
      setChannels(items);
      setActiveChannel(items[0] ?? null);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="rounded border border-border bg-panel p-6 text-sm font-bold text-muted">
        Loading channels...
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
      <VideoPlayer
        src={activeChannel?.videoUrl ?? ""}
        title={activeChannel?.name ?? "GoalVerse Stream"}
      />
      <aside className="rounded border border-border bg-panel/90 p-4">
        <div className="mb-4">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-accent">
            Channels
          </p>
          <h2 className="mt-1 font-display text-xl font-black text-white">
            Live Feed
          </h2>
        </div>
        <ChannelList
          channels={channels}
          activeChannelId={activeChannel?.id ?? ""}
          onSelect={setActiveChannel}
        />
      </aside>
    </div>
  );
}
