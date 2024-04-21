import { config } from "dotenv";

config();

import "reflect-metadata";
import express, { Express } from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import hpp from "hpp";
import bodyParser from "body-parser";
import cors from "cors";
import { AppDataSource } from "./data-source";
import * as process from "process";

const app: Express = express();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(hpp());

app.get("/", (req, res) => {
  res.send("Hello from server!");
});

const PORT: number = parseInt(process.env.PORT || "3000", 10);

AppDataSource.initialize()
  .then(async () => {
    console.log("Hi");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log("Error: ", error));
