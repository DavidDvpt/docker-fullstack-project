import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes/routes";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/api/v1", routes);

export default app;
