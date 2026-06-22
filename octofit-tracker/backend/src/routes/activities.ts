import { Router, Request, Response } from "express";
import Activity from "../models/activity";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const activities = await Activity.find();
  res.json({ message: "List all activities", activities });
});

router.post("/", async (req: Request, res: Response) => {
  const activity = await Activity.create(req.body);
  res.status(201).json({ message: "Create activity", activity });
});

export default router;
