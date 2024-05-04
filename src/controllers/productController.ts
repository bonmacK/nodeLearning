import { Request, Response } from "express";
import * as productService from "../services/productService";
import { ErrorMessage } from "../utils/constants";
import { CreateProductDto } from "../dto/product.dto";

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { products, count } = await productService.getAllProducts();
    res.status(200).json({ products, count });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).send(ErrorMessage.errorGetAllUsers);
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productId = +req.params.id;
    const currentProduct = await productService.getProductById(productId);
    res.status(200).json(currentProduct);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).send(ErrorMessage.errorGetProduct);
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productDto: CreateProductDto = req.body;
    const product = await productService.createProduct(productDto);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
