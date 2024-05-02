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
import routesAuth from "./routes/auth";
import routesUser from "./routes/users";

const app: Express = express();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(hpp());

app.use("/api/auth", routesAuth);
app.use("/api/users", routesUser);

app.get("/", (req, res) => {
  res.send("Hello from server!");
});

app.use((req, res) => {
  console.error(res);
  res.status(400).send("Bad Request!+");
});
app.use((req, res) => {
  console.error(res);
  res.status(500).send("Something broke!");
});

const PORT: number = parseInt(process.env.PORT || "4400", 10);

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log("Error: ", error));
