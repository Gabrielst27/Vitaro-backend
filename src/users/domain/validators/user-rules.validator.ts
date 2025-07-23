import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { UserProps } from '../entities/user-entity';
import { ERole } from '../../../shared/domain/enums/role.enum';

export class UserRules {
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
    message:
      'username must contain only alpha characters (except for whitespace)',
  })
  @IsNotEmpty()
  @Length(2, 64)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(12, 64)
  email: string;

  @IsInt()
  @IsOptional()
  age?: number;

  @IsNumber()
  @IsOptional()
  height?: number;

  @IsNumber()
  @IsOptional()
  weight?: number;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @IsEnum(ERole)
  @IsNotEmpty()
  role: ERole;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @IsDate()
  @IsOptional()
  disabledAt?: Date;

  constructor({
    name,
    email,
    age,
    height,
    weight,
    role,
    isActive,
    createdAt,
    updatedAt,
    disabledAt,
  }: UserProps) {
    Object.assign(this, {
      name,
      email,
      age,
      height,
      weight,
      role,
      isActive,
      createdAt,
      updatedAt,
      disabledAt,
    });
  }
}
