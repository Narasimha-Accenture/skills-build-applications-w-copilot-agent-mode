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

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "OctoFit Tracker API is running.", apiUrl: app.locals.apiUrl || `http://localhost:${port}` });
});

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "healthy" });
});

app.use("/api/users", usersRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/workouts", workoutsRouter);

export const startServer = async (apiUrl: string): Promise<void> => {
  app.locals.apiUrl = apiUrl;

  await connectDatabase();
  console.log("Connected to MongoDB at", mongoUri);

  app.listen(port, () => {
    console.log(`Server listening on ${apiUrl}`);
  });
};
