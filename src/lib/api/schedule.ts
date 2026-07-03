import axios from "axios";
import type { Match } from "@/types/football";
import { matches } from "@/lib/mock-football";

export async function getSchedule() {
  try {
    const response = await axios.get<Match[]>("/api/schedule");
    return response.data;
  } catch {
    return matches;
  }
}
