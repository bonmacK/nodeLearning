import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/users.entity";
import { RefreshToken } from "./entities/refresh-tokens.entity";
import * as process from "process";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [User, RefreshToken],
});
