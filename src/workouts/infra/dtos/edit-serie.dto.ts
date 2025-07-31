import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class EditSerieDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

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
