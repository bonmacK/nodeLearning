import { NextFunction, RequestHandler, Responce } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../entities/users.entity";
import * as process from "process";
import { UserRequest, DataInToken } from "../interfaces/auth.interface";

const authMiddleware = (): RequestHandler => {
  return async (req: UserRequest, res: Responce, next: NextFunction) => {
    try {
      const authorization =
        req.cookies["Authorization"] ||
        (req.header("Authorization")
          ? req.header("Authorization").split("Bearer ")[1]
          : null);

      if (authorization) {
        const secretKey: string = process.env.ACCESS_TOKEN_SECRET;

        const { id } = verify(authorization, secretKey) as DataInToken;
        const user = await User.findOne({ where: { id } });

        if (user) {
          req.user = user;
          return next();
        } else {
          return res.status(401).send("Wrong authentication token");
        }
      } else {
        res.status(402).send("Authentication token missing");
      }
    } catch (e) {
      return res.status(401).send("Wrong authentication token");
    }
  };
};

export default authMiddleware;
