import express, { Router } from "express";
import * as userController from "../controllers/userController";
import authMiddleware from "../middlewares/auth.middleware";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import validationMiddleware from "../middlewares/validation.middleware";

const router: Router = express.Router();

router.get("/", authMiddleware(), userController.getAllUsers);
router.post(
  "/",
  authMiddleware(),
  validationMiddleware(CreateUserDto, "body"),
  userController.createUser
);
router.patch(
  "/:id",
  authMiddleware(),
  validationMiddleware(UpdateUserDto, "body"),
  userController.updateUser
);

export default router;
