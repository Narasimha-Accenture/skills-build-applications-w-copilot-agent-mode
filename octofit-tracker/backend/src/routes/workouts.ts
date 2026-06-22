import { Router, Request, Response } from "express";
import Workout from "../models/workout";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const workouts = await Workout.find();
  res.json({ message: "List all workouts", workouts });
});

router.post("/", async (req: Request, res: Response) => {
  const workout = await Workout.create(req.body);
  res.status(201).json({ message: "Create workout", workout });
});

export default router;
