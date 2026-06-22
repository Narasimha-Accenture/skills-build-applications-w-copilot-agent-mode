import { Schema, model } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  role: "athlete" | "coach" | "admin";
  teamId?: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ["athlete", "coach", "admin"] },
  teamId: { type: String, required: false },
  createdAt: { type: Date, default: () => new Date() }
});

export default model<IUser>("User", userSchema);
