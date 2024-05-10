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
import { AppDataSource } from "./data-sourсe";
import routesAuth from "./routes/auth";
import routesUser from "./routes/user";
import routesProduct from "./routes/product";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Logger } from "./entities/logger.entity";

const loggerMiddleware = morgan("dev");
const app: Express = express();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(hpp());
app.use(loggerMiddleware);

app.use((req, res, next) => {
  const logEntry = new Logger();
  logEntry.method = req.method;
  logEntry.url = req.url;
  logEntry.status = res.statusCode;

  logEntry.save().catch((error) => {
    console.error("Error on saving log to database:", error);
  });

  next();
});

app.use("/api/auth", routesAuth);
app.use("/api/users", routesUser);
app.use("/api/products", routesProduct);

app.get("/", (req, res) => {
  res.send("Hello from server!");
});

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "REST API",
      version: "1.0.0",
      description: "Example docs",
    },
  },
  apis: ["swagger.yaml"],
};

const specs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use((req, res) => {
  res.status(400).send("Bad Request!");
});

app.use((req, res) => {
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
