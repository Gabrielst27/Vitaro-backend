import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { CreateWorkoutUseCase } from '../../application/usecases/create-workout.usecase';
import { EWorkoutGoals } from '../../domain/enums/workout-categories.enum';
import { EWorkoutSports } from '../../domain/enums/workout-sports.enum';
import { Type } from 'class-transformer';
import { CreateExerciseDto } from './create-exercise.dto';

export class CreateWorkoutDto implements CreateWorkoutUseCase.Input {
  @IsString()
  @Length(4, 32)
  @IsNotEmpty()
  title: string;

  @IsEnum(EWorkoutGoals)
  @IsNotEmpty()
  goal: EWorkoutGoals;

  @IsEnum(EWorkoutSports)
  @IsNotEmpty()
  sport: EWorkoutSports;

  @IsArray()
  @ValidateNested()
  @Type(() => CreateExerciseDto)
  exercises: CreateExerciseDto[];
}
