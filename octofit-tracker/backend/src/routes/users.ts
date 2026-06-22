import { Router, Request, Response } from "express";
import User from "../models/user";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const users = await User.find();
  res.json({ message: "List all users", users });
});

router.post("/", async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(201).json({ message: "Create user", user });
});

export default router;
