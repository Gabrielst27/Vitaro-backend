import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { CreateWorkoutUseCase } from '../../application/usecases/create-workout.usecase';
import { EWorkoutCategories } from '../../domain/enums/workout-categories.enum';
import { EWorkoutSports } from '../../domain/enums/workout-sports.enum';
import { Type } from 'class-transformer';
import { ExerciseRules } from '../../domain/validators/exercise.rules';
import { CreateExerciseDto } from './create-exercise.dto';

export class CreateWorkoutDto implements CreateWorkoutUseCase.Input {
  @IsString()
  @Length(4, 32)
  @IsNotEmpty()
  title: string;

  @IsEnum(EWorkoutCategories)
  @IsNotEmpty()
  category: EWorkoutCategories;

  @IsEnum(EWorkoutSports)
  @IsNotEmpty()
  sport: EWorkoutSports;

  @IsArray()
  @ValidateNested()
  @Type(() => CreateExerciseDto)
  exercises: CreateExerciseDto[];
}
