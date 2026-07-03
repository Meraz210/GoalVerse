import axios from "axios";

export type ChannelRecord = {
  _id: string;
  name: string;
  channelsNumber?: string;
  logo?: string;
  groupTitle?: string;
  channelUrl?: string;
};

export type Channel = {
  id: string;
  name: string;
  channelCount: string;
  logo: string;
  group: string;
  videoUrl: string;
};

const fallbackChannels: Channel[] = [
  {
    id: "demo-sports",
    name: "GoalVerse Sports Demo",
    channelCount: "DEMO",
    logo: "/globe.svg",
    group: "Sports",
    videoUrl: "",
  },
];

export async function getChannels() {
  try {
    const response = await axios.get<ChannelRecord[]>("/api/channels");
    return response.data.map(mapChannel);
  } catch {
    return fallbackChannels;
  }
}

function mapChannel(record: ChannelRecord): Channel {
  return {
    id: record._id,
    name: record.name,
    channelCount: record.channelsNumber ?? "CH",
    logo: record.logo ?? "/globe.svg",
    group: record.groupTitle ?? "Sports",
    videoUrl: record.channelUrl ?? "",
  };
}
