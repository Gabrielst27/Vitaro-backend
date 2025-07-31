import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  ValidateNested,
} from 'class-validator';
import { EWorkoutGoals } from '../../domain/enums/workout-goals.enum';
import { EWorkoutSports } from '../../domain/enums/workout-sports.enum';
import { Type } from 'class-transformer';
import { EditExerciseDto } from './edit-exercise.dto';

export class EditWorkoutDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

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
  @ArrayMinSize(0)
  @ValidateNested()
  @Type(() => EditExerciseDto)
  exercises: EditExerciseDto[];
}
