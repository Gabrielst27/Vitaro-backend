import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateSerieDto {
  @IsInt()
  @IsNotEmpty()
  position: number;

  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsInt()
  @IsNotEmpty()
  reps: number;

  @IsInt()
  @IsOptional()
  restInSeconds?: number;

  @IsString()
  @Length(2, 32)
  @IsOptional()
  technique?: string;

  @IsString()
  @Length(2, 32)
  @IsOptional()
  accessory?: string;
}
