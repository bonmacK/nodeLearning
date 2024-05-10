import express, { Router } from "express";
import * as authController from "../controllers/authController";
import validationMiddleware from "../middlewares/validation.middleware";
import { RegisterUserDto } from "../dto/auth.dto";

const router: Router = express.Router();

router.post(
  "/register",
  validationMiddleware(RegisterUserDto, "body"),
  authController.register
);
router.post("/login", authController.login);
router.post("/token", authController.token);
router.delete("/logout", authController.logout);

export default router;
