import { Entity } from '../../../shared/domain/entities/entity';
import { EWorkoutCategories } from '../enums/workout-categories.enum';
import { EWorkoutSports } from '../enums/workout-sports.enum';
import { ExerciseEntity } from './exercise.entity';

export type WorkoutProps = {
  title: string;
  category: EWorkoutCategories;
  sport: EWorkoutSports;
  exercises: ExerciseEntity[];
  createdAt?: Date;
  updatedAt?: Date;
};

export class WorkoutEntity extends Entity<WorkoutProps> {
  constructor(props: WorkoutProps, id?: string) {
    super(props, id);
  }
}
