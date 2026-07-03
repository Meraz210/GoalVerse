import type { Metadata } from "next";
import { StreamDashboard } from "@/components/stream/stream-dashboard";
import { PageShell } from "@/components/ui/page-shell";

export const metadata: Metadata = {
  title: "Watch",
  description:
    "Watch licensed HLS football channels through the GoalVerse server-side proxy.",
};

export default function WatchPage() {
  return (
    <PageShell
      eyebrow="Streaming"
      title="Watch Live Channels"
      description="Connect SERVER_URL to a licensed backend that returns channelUrl values. GoalVerse handles channel mapping, HLS playback, quality selection, volume, and fullscreen controls."
    >
      <StreamDashboard />
    </PageShell>
  );
}
