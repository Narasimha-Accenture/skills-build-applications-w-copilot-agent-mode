import { Schema, model } from "mongoose";

export interface ILeaderboardEntry {
  userId: string;
  teamId?: string;
  rank: number;
  score: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: String, required: true },
  teamId: { type: String, required: false },
  rank: { type: Number, required: true },
  score: { type: Number, required: true },
  updatedAt: { type: Date, default: () => new Date() }
});

export default model<ILeaderboardEntry>("Leaderboard", leaderboardSchema);
