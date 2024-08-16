import express, { Request, Response } from "express";

const router = express.Router();

router.use("/", loginPost);

function loginPost(req: Request, res: Response) {
  try {
    res.status(201).json({ message: "it is login" });
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials" });
  }
}

export default router;
