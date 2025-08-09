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
  @IsOptional()
  weight: number;

  @IsInt()
  @IsNotEmpty()
  reps: number;

  @IsInt()
  @IsOptional()
  restInSeconds: number;

  @IsString()
  @Length(0, 32)
  @IsOptional()
  techniqueId: string;

  @IsString()
  @Length(0, 32)
  @IsOptional()
  accessory: string;
}
