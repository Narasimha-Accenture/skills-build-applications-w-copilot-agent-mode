import { Schema, model } from "mongoose";

export interface IActivity {
  userId: string;
  type: string;
  durationMinutes: number;
  distanceKm?: number;
  caloriesBurned: number;
  recordedAt: Date;
}

const activitySchema = new Schema<IActivity>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number, required: false },
  caloriesBurned: { type: Number, required: true },
  recordedAt: { type: Date, default: () => new Date() }
});

export default model<IActivity>("Activity", activitySchema);
