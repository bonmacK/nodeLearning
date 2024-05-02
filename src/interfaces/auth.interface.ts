import { Request } from "express";
import { User } from "../entities/users.entity";

export interface UserRequest extends Request {
  user: User;
  cookies: any;
  header(name: string): string | undefined;
}

export interface DataInToken {
  id: number;
  role: string;
  email: string;
}
