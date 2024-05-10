import express, { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/validation.middleware";
import * as productController from "../controllers/productController";
import { CreateProductDto } from "../dto/product.dto";

const router: Router = express.Router();

router.get("/", authMiddleware(), productController.getAllProducts);
router.post(
  "/",
  authMiddleware(),
  validationMiddleware(CreateProductDto, "body"),
  productController.createProduct
);
router.get("/:id", authMiddleware(), productController.getProductById);

export default router;
