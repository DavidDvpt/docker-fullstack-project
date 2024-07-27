import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", function (req, res) {
  res.send("it's works !!!! ");
});

export default app;
