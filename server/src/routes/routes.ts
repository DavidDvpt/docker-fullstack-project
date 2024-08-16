import express from "express";
import loginRoute from "./loginRoute";

const router = express.Router();

router.use("/login", loginRoute);

router.get("/", function (req, res) {
  res.send("it's works !!!! top ");
});

export default router;
