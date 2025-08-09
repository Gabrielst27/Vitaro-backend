import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';
import { ExerciseProps } from '../entities/exercise.entity';
import { SerieProps } from '../entities/serie.entity';

export class ExerciseRules {
  @IsNumberString()
  @Length(4, 4)
  @IsNotEmpty()
  refId: string;

  @IsArray()
  @ArrayMinSize(0)
  series: SerieProps[];

  constructor({ refId, series }: ExerciseProps) {
    Object.assign(this, {
      refId,
      series,
    });
  }
}
