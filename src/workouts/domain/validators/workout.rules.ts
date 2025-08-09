import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { EWorkoutGoals } from '../enums/workout-goals.enum';
import { EWorkoutSports } from '../enums/workout-sports.enum';
import { WorkoutProps } from '../entities/workout.entity';
import { ExerciseProps } from '../entities/exercise.entity';

export class WorkoutRules {
  @IsUUID()
  @IsNotEmpty()
  authorId: string;

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

  @IsArray()
  @ArrayMinSize(0)
  exercises: ExerciseProps[];

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  constructor({
    authorId,
    title,
    goal: category,
    sport,
    exercises,
    createdAt,
    updatedAt,
  }: WorkoutProps) {
    Object.assign(this, {
      authorId,
      title,
      category,
      sport,
      exercises,
      createdAt,
      updatedAt,
    });
  }
}
