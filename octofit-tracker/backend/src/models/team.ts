import { Schema, model } from "mongoose";

export interface ITeam {
  name: string;
  description: string;
  members: string[];
  createdAt: Date;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: String, required: true }],
  createdAt: { type: Date, default: () => new Date() }
});

export default model<ITeam>("Team", teamSchema);
