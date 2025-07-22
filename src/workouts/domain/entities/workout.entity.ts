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
  private _authorId: string;
  private _title: string;
  private _goal: EWorkoutGoals;
  private _sport: EWorkoutSports;
  private _exercises: ExerciseEntity[];
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: WorkoutProps, id?: string) {
    WorkoutEntity.validate(props);
    super(props, id);
    const exercises = WorkoutEntity.initializeExercises(props.exercises);
    this._exercises = exercises;
    this._createdAt = this.props.createdAt ?? new Date();
    this._updatedAt = this.props.updatedAt ?? new Date();
  }

  public get authorId() {
    return this._authorId;
  }

  public get title() {
    return this._title;
  }

  public get category() {
    return this._goal;
  }

  public get sport() {
    return this._sport;
  }

  public get exercises() {
    return this._exercises;
  }

  public get createdAt() {
    return this._createdAt;
  }

  public get updatedAt() {
    return this._updatedAt;
  }

  static initializeExercises(exercises: ExerciseProps[]): ExerciseEntity[] {
    if (exercises.length < 1) {
      return [];
    }
    const entities: ExerciseEntity[] = [];
    for (const exercise of exercises) {
      entities.push(new ExerciseEntity(exercise));
    }
    return entities;
  }

  static validate(props: WorkoutProps): void {
    const validator = WorkoutValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
