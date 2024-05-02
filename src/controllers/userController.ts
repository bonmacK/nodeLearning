import { Request, Response } from "express";
import * as userService from "../services/userService";
import { ErrorMessage } from "../utils/constants";
import { CreateUserDto } from "../dto/user.dto";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { users, count } = await userService.getAllUsers();
    res.status(200).json({ users, count });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).send(ErrorMessage.errorGetAllUsers);
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userDto: CreateUserDto = req.body;
    const user = await userService.createUser(userDto);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = +req.params.id;
    const userDto = req.body;
    const user = await userService.updateUser(id, userDto);

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
