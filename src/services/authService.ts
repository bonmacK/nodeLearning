import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../entities/users.entity";
import * as process from "process";
import { removeRefreshToken } from "../utils/tokenManagement";

interface UserPayload {
  id: number;
  email: string;
}

export const registerUser = async (registerUserData: any) => {
  const { name, email, password } = registerUserData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: User = await User.save({
    name,
    email,
    password: hashedPassword,
    userRoleId: 2,
  });
  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const user: User = await User.findOne({
    where: { email },
    select: ["id", "email", "password"],
  });
  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);
  return isPasswordValid ? user : null;
};

export const generateAccessToken = (user: UserPayload) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "1d" }
  );
};

export const generateRefreshToken = (user: UserPayload) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.REFRESH_TOKEN_SECRET!
  );
};

export const logoutUser = async (token: string) => {
  await removeRefreshToken(token);
};
