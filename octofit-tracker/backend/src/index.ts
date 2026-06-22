import express, { Request, Response } from "express";
import usersRouter from "./routes/users";
import teamsRouter from "./routes/teams";
import activitiesRouter from "./routes/activities";
import leaderboardRouter from "./routes/leaderboard";
import workoutsRouter from "./routes/workouts";
import { connectDatabase, getMongoUri } from "./config/database";

export const app = express();
const port = 8000;
const mongoUri = getMongoUri();
const codespaceName = process.env.CODESPACE_NAME;
const host = codespaceName ? `${codespaceName}-8000.app.github.dev` : "localhost";
const apiUrl = codespaceName ? `https://${host}` : `http://${host}:${port}`;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "OctoFit Tracker API is running.", apiUrl });
});

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "healthy" });
});

app.use("/api/users", usersRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/workouts", workoutsRouter);

export const startServer = async (): Promise<void> => {
  await connectDatabase();
  console.log("Connected to MongoDB at", mongoUri);

  app.listen(port, () => {
    console.log(`Server listening on ${apiUrl}`);
  });
};

if (require.main === module) {
  startServer().catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
}
