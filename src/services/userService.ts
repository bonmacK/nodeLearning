import { User } from "../entities/users.entity";
import bcrypt from "bcrypt";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";

export const getAllUsers = async () => {
  const [users, count] = await User.findAndCount({});
  return {
    users,
    count,
  };
};

export const createUser = async (
  createUserDto: CreateUserDto
): Promise<User> => {
  const { name, email, password } = createUserDto;
  const newUser: User = await User.save({ name, email, password });
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
