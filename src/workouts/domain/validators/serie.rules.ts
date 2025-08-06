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
  @IsOptional()
  weight?: number;

  @IsInt()
  @IsNotEmpty()
  reps: number;

  @IsInt()
  @IsOptional()
  restInSeconds?: number;

  @IsString()
  @Length(0, 32)
  @IsOptional()
  techniqueId?: string;

  @IsString()
  @Length(0, 32)
  @IsOptional()
  accessory?: string;

  constructor({
    position,
    weight,
    reps,
    restInSeconds,
    techniqueId: technique,
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
