import express, { Router } from "express";
import * as userController from "../controllers/userController";
import authMiddleware from "../middlewares/auth.middleware";
import {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserRoleDto,
} from "../dto/user.dto";
import validationMiddleware from "../middlewares/validation.middleware";
import roleMiddleware from "../middlewares/role.middleware";

const router: Router = express.Router();

router.get("/", authMiddleware(), roleMiddleware(), userController.getAllUsers);
router.post(
  "/",
  authMiddleware(),
  roleMiddleware(),
  validationMiddleware(CreateUserDto, "body"),
  userController.createUser
);
router.patch(
  "/:id/role",
  authMiddleware(),
  roleMiddleware(),
  validationMiddleware(UpdateUserRoleDto, "body"),
  userController.updateUserRole
);
router.post(
  "/:id/add-product/:productId",
  authMiddleware(),
  roleMiddleware(),
  userController.addProduct
);
router.patch(
  "/:id",
  authMiddleware(),
  roleMiddleware(),
  validationMiddleware(UpdateUserDto, "body"),
  userController.updateUser
);

export default router;
