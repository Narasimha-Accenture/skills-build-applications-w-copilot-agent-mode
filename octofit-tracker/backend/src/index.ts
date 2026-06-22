import express, { Request, Response } from "express";
import mongoose from "mongoose";

const app = express();
const port = 8000;
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/octofit";

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "OctoFit Tracker API is running." });
});

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "healthy" });
});

mongoose.connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB at", mongoUri);
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
