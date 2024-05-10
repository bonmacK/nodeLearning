import { Product } from "../entities/products.entity";
import { CreateProductDto } from "../dto/product.dto";

export const getAllProducts = async () => {
  const [products, count] = await Product.findAndCount({});
  return {
    products,
    count,
  };
};

export const createProduct = async (
  createUserDto: CreateProductDto
): Promise<Product> => {
  const { name, color } = createUserDto;
  const newProduct: Product = await Product.save({ name, color });
  return newProduct;
};

export const getProductById = async (productId: number) => {
  const currentProduct: Product = await Product.findOne({
    where: { id: productId },
    relations: ["users"],
  });
  return currentProduct;
};
