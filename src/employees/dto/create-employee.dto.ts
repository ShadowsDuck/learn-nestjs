import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RoleEnum } from './query-role.dto';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(RoleEnum, { message: 'role must be either admin or user' })
  @IsNotEmpty()
  role: RoleEnum;
}
