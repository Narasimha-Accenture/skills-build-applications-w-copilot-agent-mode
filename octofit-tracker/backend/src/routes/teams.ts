import { Router, Request, Response } from "express";
import Team from "../models/team";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const teams = await Team.find();
  res.json({ message: "List all teams", teams });
});

router.post("/", async (req: Request, res: Response) => {
  const team = await Team.create(req.body);
  res.status(201).json({ message: "Create team", team });
});

export default router;
