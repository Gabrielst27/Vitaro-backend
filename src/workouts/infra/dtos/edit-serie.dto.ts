import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class EditSerieDto {
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
  @IsNotEmpty()
  restInSeconds: number;

  @IsString()
  @Length(0, 32)
  @IsOptional()
  technique: string;

  @IsString()
  @Length(0, 32)
  @IsOptional()
  accessory: string;
}
