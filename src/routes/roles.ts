import express, { Router } from "express";
import * as roleController from "../controllers/roleController";
import authMiddleware from "../middlewares/auth.middleware";
import roleMiddleware from "../middlewares/role.middleware";

const router: Router = express.Router();

router.get("/", authMiddleware(), roleMiddleware(), roleController.getAllRoles);

export default router;
