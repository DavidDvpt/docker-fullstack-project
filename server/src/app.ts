import express from "express";

const app: Express = express();
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

export default app;
