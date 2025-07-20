import { IsNotEmpty, IsNumberString, IsString, Length } from 'class-validator';
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

  constructor({ refId, name }: ExerciseProps) {
    Object.assign(this, {
      refId,
      name,
    });
  }
}
