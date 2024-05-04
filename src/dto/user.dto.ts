import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsString()
  @IsNotEmpty()
  public name: string;
}

export class UpdateUserDto {
  @IsOptional()
  public email: string;

  @IsOptional()
  public password: string;

  @IsOptional()
  public name: string;
}
