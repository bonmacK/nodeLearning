import { NextFunction, RequestHandler, Responce } from "express";
import { UserRequest } from "../interfaces/auth.interface";

const roleMiddleware = (): RequestHandler => {
  return async (req: UserRequest, res: Responce, next: NextFunction) => {
    try {
      const userRole = req.user.userRoleId;
      if (userRole === 1) {
        return next();
      } else {
        res.status(402).send("This endpoint is not available for current role");
      }
    } catch (e) {
      return res.status(401).send("Wrong role");
    }
  };
};

export default roleMiddleware;
