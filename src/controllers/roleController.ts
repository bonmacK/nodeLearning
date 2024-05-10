import { Request, Response } from "express";
import * as roleService from "../services/roleService";
import { ErrorMessage } from "../utils/constants";

export const getAllRoles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { roles, count } = await roleService.getAllRoles();
    res.status(200).json({ roles, count });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).send(ErrorMessage.errorGetAllRoles);
  }
};
