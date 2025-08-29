import { IsEnum, IsOptional } from 'class-validator';

export enum RoleEnum {
  Admin = 'admin',
  User = 'user',
}

export class FindAllEmployeesDto {
  @IsOptional()
  @IsEnum(RoleEnum, { message: 'role must be either admin or user' })
  role?: RoleEnum;
}
