import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { SerieRules } from './serie.rules';
import { ExerciseProps } from '../entities/exercise.entity';

export class ExerciseRules {
  @IsNumberString()
  @Length(4, 4)
  @IsNotEmpty()
  refId: string;

  @IsString()
  @Length(2, 64)
  @IsNotEmpty()
  name: string;

  @ValidateNested()
  @Type(() => SerieRules)
  series: SerieRules[];

  constructor({ refId, name, series }: ExerciseProps) {
    Object.assign(this, {
      refId,
      name,
      series,
    });
  }
}
