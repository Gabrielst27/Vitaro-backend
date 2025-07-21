import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { EWorkoutGoals } from '../enums/workout-categories.enum';
import { EWorkoutSports } from '../enums/workout-sports.enum';
import { WorkoutProps } from '../entities/workout.entity';

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
    createdAt,
    updatedAt,
  }: WorkoutProps) {
    Object.assign(this, {
      authorId,
      title,
      category,
      sport,
      createdAt,
      updatedAt,
    });
  }
}
