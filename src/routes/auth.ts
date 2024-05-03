import express, { Router } from "express";
import * as authController from "../controllers/authController";

const router: Router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/token", authController.token);
router.delete("/logout", authController.logout);

export default router;
