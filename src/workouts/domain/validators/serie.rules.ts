import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { SerieProps } from '../entities/serie.entity';

export class SerieRules {
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
  @Length(0, 32)
  @IsOptional()
  technique?: string;

  @IsString()
  @Length(0, 32)
  @IsOptional()
  accessory?: string;

  constructor({
    position,
    weight,
    reps,
    restInSeconds,
    technique,
    accessory,
  }: SerieProps) {
    Object.assign(this, {
      position,
      weight,
      reps,
      restInSeconds,
      technique,
      accessory,
    });
  }
}
