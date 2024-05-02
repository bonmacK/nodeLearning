import { Request, Response } from "express";
import * as authService from "../services/authService";
import { storeRefreshToken } from "../utils/tokenManagement";
import { ErrorMessage } from "../utils/constants";

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
