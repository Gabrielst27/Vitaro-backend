import {
  IsBoolean,
  IsDate,
  IsDecimal,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { UserProps } from '../entities/user-entity';

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

  @IsString()
  @IsOptional()
  @Length(6, 64)
  password?: string;

  @IsInt()
  @IsOptional()
  age?: number;

  @IsDecimal()
  @IsOptional()
  height?: number;

  @IsDecimal()
  @IsOptional()
  weight?: number;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

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
    password,
    age,
    height,
    weight,
    isActive,
    createdAt,
    updatedAt,
    disabledAt,
  }: UserProps) {
    Object.assign(this, {
      name,
      email,
      password,
      age,
      height,
      weight,
      isActive,
      createdAt,
      updatedAt,
      disabledAt,
    });
  }
}
