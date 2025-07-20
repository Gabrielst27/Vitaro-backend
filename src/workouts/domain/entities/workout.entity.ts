import { Entity } from '../../../shared/domain/entities/entity';
import { EntityValidationError } from '../../../shared/domain/errors/validation.error';
import { EWorkoutCategories } from '../enums/workout-categories.enum';
import { EWorkoutSports } from '../enums/workout-sports.enum';
import { WorkoutValidatorFactory } from '../validators/workout.validator';
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
    WorkoutEntity.validate(props);
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
    this.props.updatedAt = this.props.updatedAt ?? new Date();
  }

  static validate(props: WorkoutProps): void {
    const validator = WorkoutValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
