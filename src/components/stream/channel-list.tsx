"use client";

import type { Channel } from "@/lib/api/channels";

type ChannelListProps = {
  channels: Channel[];
  activeChannelId: string;
  onSelect: (channel: Channel) => void;
};

export function ChannelList({
  channels,
  activeChannelId,
  onSelect,
}: ChannelListProps) {
  return (
    <div className="grid gap-3">
      {channels.map((channel) => {
        const active = channel.id === activeChannelId;

        return (
          <button
            key={channel.id}
            type="button"
            onClick={() => onSelect(channel)}
            className={`flex items-center gap-3 rounded border p-3 text-left transition ${
              active
                ? "border-accent bg-accent/10"
                : "border-border bg-panel hover:border-white/20"
            }`}
          >
            <span className="grid size-11 place-items-center rounded bg-white/8 text-xs font-black text-white">
              {channel.channelCount}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-black text-white">
                {channel.name}
              </span>
              <span className="mt-1 block text-xs font-bold text-muted">
                {channel.group}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
