import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { EWorkoutGoals } from '../enums/workout-categories.enum';
import { EWorkoutSports } from '../enums/workout-sports.enum';
import { Type } from 'class-transformer';
import { ExerciseRules } from './exercise.rules';
import { WorkoutProps } from '../entities/workout.entity';

export class WorkoutRules {
  @IsString()
  @Length(4, 32)
  @IsNotEmpty()
  title: string;

  @IsEnum(EWorkoutGoals)
  @IsNotEmpty()
  category: EWorkoutGoals;

  @IsEnum(EWorkoutSports)
  @IsNotEmpty()
  sport: EWorkoutSports;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  constructor({
    title,
    goal: category,
    sport,
    createdAt,
    updatedAt,
  }: WorkoutProps) {
    Object.assign(this, {
      title,
      category,
      sport,
      createdAt,
      updatedAt,
    });
  }
}
