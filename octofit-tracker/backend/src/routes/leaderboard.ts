import { Router, Request, Response } from "express";
import Leaderboard from "../models/leaderboard";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const leaderboard = await Leaderboard.find().sort({ rank: 1 });
  res.json({ message: "Get leaderboard", leaderboard });
});

export default router;
