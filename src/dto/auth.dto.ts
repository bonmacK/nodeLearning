import { IsString, IsNotEmpty } from "class-validator";

export class RegisterUserDto {
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsString()
  @IsNotEmpty()
  public name: string;
}
