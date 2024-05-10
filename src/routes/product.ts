import express, { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/validation.middleware";
import * as productController from "../controllers/productController";
import { CreateProductDto } from "../dto/product.dto";
import roleMiddleware from "../middlewares/role.middleware";

const router: Router = express.Router();

router.get(
  "/",
  authMiddleware(),
  roleMiddleware(),
  productController.getAllProducts
);
router.post(
  "/",
  authMiddleware(),
  roleMiddleware(),
  validationMiddleware(CreateProductDto, "body"),
  productController.createProduct
);
router.get(
  "/:id",
  authMiddleware(),
  roleMiddleware(),
  productController.getProductById
);

export default router;
