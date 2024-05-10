import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNumber()
  @IsNotEmpty()
  public roleId?: number;

  @IsNumber()
  @IsOptional()
  public userRoleId?: number;
}

export class UpdateUserDto {
  @IsOptional()
  public email: string;

  @IsOptional()
  public password: string;

  @IsOptional()
  public name: string;
}

export class UpdateUserRoleDto {
  @IsNumber()
  @IsNotEmpty()
  public roleId: number;
}
