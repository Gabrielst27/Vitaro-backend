import { Entity } from '../../../shared/domain/entities/entity';
import { EntityValidationError } from '../../../shared/domain/errors/validation.error';
import { EWorkoutGoals } from '../enums/workout-goals.enum';
import { EWorkoutSports } from '../enums/workout-sports.enum';
import { WorkoutValidatorFactory } from '../validators/workout.validator';
import { ExerciseEntity, ExerciseProps } from './exercise.entity';

export type WorkoutProps = {
  authorId: string;
  title: string;
  goal: EWorkoutGoals;
  sport: EWorkoutSports;
  exercises: ExerciseProps[];
  createdAt?: Date;
  updatedAt?: Date;
};

export class WorkoutEntity extends Entity<WorkoutProps> {
  private readonly _exercises: ExerciseEntity[] = [];
  constructor(props: WorkoutProps, id?: string) {
    WorkoutEntity.validate(props);
    const createdAt: Date = props.createdAt ?? new Date();
    const updatedAt: Date = props.updatedAt ?? new Date();
    super({ ...props, createdAt, updatedAt }, id);
    this.initializeExercises(props.exercises);
  }

  public get authorId() {
    return this.props.authorId;
  }

  public get title() {
    return this.props.title;
  }

  public get goal() {
    return this.props.goal;
  }

  public get sport() {
    return this.props.sport;
  }

  public get exercises() {
    return this._exercises;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }

  static validate(props: WorkoutProps): void {
    const validator = WorkoutValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  private initializeExercises(exercises: ExerciseProps[]) {
    if (exercises.length < 1) {
      return;
    }
    for (const exercise of exercises) {
      const entity = new ExerciseEntity(exercise);
      this._exercises.push(entity);
    }
  }
}
