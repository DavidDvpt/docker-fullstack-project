import express, { Request, Response } from "express";
import dbClient from "lib/prisma/dbClient";

const router = express.Router();

router.use("/", loginPost);

async function loginPost(req: Request, res: Response) {
  // try {
  const body = req.body;

  if (!body.login) return res.status(422).json({ message: "no login found" });
  if (!body.password)
    return res.status(422).json({ message: "no password found" });
  console.log(body);
  const user = await dbClient.user.findUnique({
    where: { email: body.login },
  });

  if (user) {
    return res.status(201).json({ message: "it is login" });
  } else {
    return res.status(401).json({ message: "user not found" });
  }
  // } catch (error: any) {
  //   res.status(401).json(error.message);
  // }
}

export default router;
