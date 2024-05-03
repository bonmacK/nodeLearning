import { Request, Response } from "express";
import * as authService from "../services/authService";
import {
  retrieveRefreshToken,
  storeRefreshToken,
} from "../utils/tokenManagement";
import { ErrorMessage } from "../utils/constants";
import jwt from "jsonwebtoken";
import * as process from "process";
import { User } from "../entities/users.entity";

export const register = async (req: Request, res: Response) => {
  try {
    const registerUserDto = req.body;
    const newUser = await authService.registerUser(registerUserDto);

    res
      .status(201)
      .json({ message: "User register successfully", user: newUser });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).send(ErrorMessage.errorRegisterUser);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.loginUser(email, password);

  if (user) {
    const accessToken = authService.generateAccessToken({
      id: user.id,
      email: user.email,
    });
    const refreshToken = authService.generateRefreshToken({
      id: user.id,
      email: user.email,
    });

    await storeRefreshToken(user.id, refreshToken);
    res.json({ accessToken, refreshToken });
  } else {
    res.status(400).send(ErrorMessage.errorInvalidPassword);
  }
};

export const token = async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) return res.sendStaus(401);

  try {
    const storedToken = await retrieveRefreshToken(token);
    if (!storedToken) return res.sendStatus(403);

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!, (err, user: User) => {
      if (err) return res.sendStatus(403);

      const accessToken = authService.generateAccessToken({
        id: user.id,
        email: user.email,
      });
      res.json({ accessToken });
    });
  } catch (e: unknown) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    await authService.logoutUser(req.body.token);
  } catch (e: unknown) {
    console.error(e);
  }
  res.json({ message: "logout" });
};
