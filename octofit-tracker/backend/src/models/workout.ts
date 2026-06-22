import { Schema, model } from "mongoose";

export interface IWorkout {
  title: string;
  description: string;
  durationMinutes: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  createdAt: Date;
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true, enum: ["Beginner", "Intermediate", "Advanced"] },
  createdAt: { type: Date, default: () => new Date() }
});

export default model<IWorkout>("Workout", workoutSchema);
