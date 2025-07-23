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

  @IsString()
  @Length(2, 64)
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ArrayMinSize(0)
  series: SerieProps[];

  constructor({ refId, name, series }: ExerciseProps) {
    Object.assign(this, {
      refId,
      name,
      series,
    });
  }
}
