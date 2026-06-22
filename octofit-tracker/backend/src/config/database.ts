import mongoose from "mongoose";

const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/octofit_db";

export const getMongoUri = (): string => mongoUri;

export const connectDatabase = async (): Promise<typeof mongoose> => {
  return mongoose.connect(mongoUri);
};
