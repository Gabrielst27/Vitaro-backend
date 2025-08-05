import { BadRequestError } from '../../../shared/application/errors/bad-request.error';
import { ForbiddenError } from '../../../shared/application/errors/forbidden.error';
import { UnauthorizedError } from '../../../shared/application/errors/unauthorized.error';
import { IUsecase } from '../../../shared/application/usecases/usecase.interface';
import { ErrorCodes } from '../../../shared/domain/enums/error-codes.enum';
import { ExerciseEntity } from '../../domain/entities/exercise.entity';
import { WorkoutEntity } from '../../domain/entities/workout.entity';
import { EWorkoutGoals } from '../../domain/enums/workout-goals.enum';
import { EWorkoutSports } from '../../domain/enums/workout-sports.enum';
import { IWorkoutRepository } from '../../domain/repositories/workout.repository.interface';
import { WorkoutOutput, WorkoutOutputMapper } from '../outputs/workout.output';

export namespace EditWorkoutUseCase {
  export type Input = {
    id: string;
    title: string;
    goal: EWorkoutGoals;
    sport: EWorkoutSports;
    exercises: {
      refId: string;
      series: {
        position: number;
        weight: number;
        reps: number;
        restInSeconds: number;
        technique: string;
        accessory: string;
      }[];
    }[];
  };

  export type Output = WorkoutOutput;

  export class UseCase implements IUsecase<Input, Output> {
    constructor(private workoutRepository: IWorkoutRepository.Repository) {}

    async execute(input: Input, userId?: string): Promise<WorkoutOutput> {
      if (!userId) {
        throw new UnauthorizedError(ErrorCodes.USER_NOT_AUTHENTICATED);
      }
      const { id, title, goal, sport, exercises } = input;
      if (!id || !title || !goal || !sport || !exercises) {
        throw new BadRequestError(ErrorCodes.INPUT_NOT_PROVIDED);
      }
      const entity = await this.workoutRepository.findById(id);
      if (entity.authorId !== userId) {
        throw new ForbiddenError(ErrorCodes.FORBIDDEN);
      }
      entity.updateProps({ ...entity.props, title, goal, sport });
      this.removeExercises(entity, exercises);
      this.updateExercises(entity, exercises);
      await this.workoutRepository.update(entity);
      return WorkoutOutputMapper.toOutput(entity);
    }

    private removeExercises(
      workout: WorkoutEntity,
      exercises: Input['exercises'],
    ) {
      for (const exerciseEntity of workout.exercises) {
        const itemProps = exercises.find(
          (item) => item.refId === exerciseEntity.refId,
        );
        if (!itemProps) {
          workout.removeExercise(exerciseEntity.refId);
        }
      }
    }

    private updateExercises(
      workout: WorkoutEntity,
      exercises: Input['exercises'],
    ): void {
      for (const exerciseProps of exercises) {
        const exerciseEntity = workout.exercises.find(
          (ex) => ex.refId === exerciseProps.refId,
        );
        if (exerciseEntity) {
          workout.exercises
            .find((ex) => ex.refId === exerciseProps.refId)!
            .updateProps(exerciseProps);
          this.removeSeries(
            workout.exercises.find((ex) => ex.refId === exerciseProps.refId)!,
            exerciseProps.series,
          );
          this.updateSeries(
            workout.exercises.find((ex) => ex.refId === exerciseProps.refId)!,
            exerciseProps.series,
          );
          workout.updateExercises();
        } else {
          workout.addExercise(exerciseProps);
        }
      }
    }

    private removeSeries(
      exercise: ExerciseEntity,
      series: Input['exercises'][number]['series'],
    ) {
      for (const serieEntity of exercise.series) {
        const itemProps = series.find(
          (item) => item.position === serieEntity.position,
        );
        if (!itemProps) {
          exercise.removeSerie(serieEntity.position);
        }
      }
    }

    private updateSeries(
      exercise: ExerciseEntity,
      series: Input['exercises'][number]['series'],
    ) {
      for (const serieProps of series) {
        const serieEntity = exercise.series.find(
          (item) => item.position === serieProps.position,
        );
        if (serieEntity) {
          exercise.series
            .find((item) => item.position === serieProps.position)!
            .updateProps(serieProps);
          exercise.updateSeries();
        } else {
          exercise.addSerie(serieProps);
        }
      }
    }
  }
}
