import { User } from "../entities/users.entity";
import bcrypt from "bcrypt";
import {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserRoleDto,
} from "../dto/user.dto";
import { Product } from "../entities/products.entity";
import { Role } from "../entities/roles.entity";

export const getAllUsers = async () => {
  const [users, count] = await User.findAndCount({
    relations: ["products"],
  });
  return {
    users,
    count,
  };
};

export const createUser = async (
  createUserDto: CreateUserDto
): Promise<User> => {
  const role = await Role.findOne({ where: { id: createUserDto.userRoleId } });

  if (!role) throw new Error("Role not found");

  const { name, email, password, userRoleId } = createUserDto;
  const newUser: User = await User.save({ name, email, password, userRoleId });
  return newUser;
};

export const updateUser = async (
  id: number,
  userDto: UpdateUserDto
): Promise<User> => {
  const { name, email, password } = userDto;

  let user: User | undefined;

  const updatedFields: Partial<User> = {
    ...(email && { email }),
    ...(name && { name }),
  };

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updatedFields.password = hashedPassword;
  }

  const result = await User.update({ id }, updatedFields);
  if (result && result.affected) {
    user = await User.findOne({ where: { id } });
  } else {
    throw Error("User hasn't been updated");
  }

  return user;
};

export const updateUserRole = async (id: number, role: any): Promise<User> => {
  let user: User | undefined;

  const result = await User.update({ id }, { userRoleId: role.roleId });
  if (result && result.affected) {
    user = await User.findOne({ where: { id } });
  } else {
    throw Error("User hasn't been updated");
  }
  return user;
};

export const addProduct = async (
  userId: number,
  productId: number
): Promise<User> => {
  const user = await User.findOne({
    where: { id: userId },
    relations: ["products"],
  });

  const product: Product = await Product.findOne({ where: { id: productId } });

  if (!user || !product) {
    throw new Error("User or product not found");
  }

  if (!user.products) {
    user.products = [product];
  } else if (user.products.some((product) => product.id === productId)) {
    return;
  } else {
    user.products.push(product);
  }

  await user.save();
  return user;
};
