import { IUsecase } from '../../../shared/application/usecases/usecase.interface';
import { EWorkoutGoals } from '../../domain/enums/workout-goals.enum';
import { EWorkoutSports } from '../../domain/enums/workout-sports.enum';
import { IWorkoutRepository } from '../../domain/repositories/workout.repository.interface';
import { WorkoutOutput, WorkoutOutputMapper } from '../outputs/workout.output';
import { WorkoutEntity } from '../../domain/entities/workout.entity';
import { SerieProps } from '../../domain/entities/serie.entity';
import { ExerciseProps } from '../../domain/entities/exercise.entity';
import { BadRequestError } from '../../../shared/application/errors/bad-request.error';
import { UnauthorizedError } from '../../../shared/application/errors/unauthorized.error';
import { ErrorCodes } from '../../../shared/domain/enums/error-codes.enum';

export namespace CreateWorkoutUseCase {
  export type Input = {
    title: string;
    goal: EWorkoutGoals;
    sport: EWorkoutSports;
    exercises: {
      refId: string;
      name: string;
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

    async execute(input: Input, authorId?: string): Promise<WorkoutOutput> {
      if (!authorId) {
        throw new UnauthorizedError(ErrorCodes.USER_NOT_AUTHENTICATED);
      }
      const { title, goal, sport, exercises } = input;
      if (!title || !goal || !sport || !exercises) {
        throw new BadRequestError(ErrorCodes.INPUT_NOT_PROVIDED);
      }
      await this.workoutRepository.titleExists(title);
      const exercisesProps: ExerciseProps[] = [];
      for (const exercise of exercises) {
        const exerciseProps: ExerciseProps = {
          ...exercise,
          series: [],
        };
        for (const serie of exercise.series) {
          const serieProps: SerieProps = {
            ...serie,
          };
          exerciseProps.series.push(serieProps);
        }
        exercisesProps.push(exerciseProps);
      }
      const entity = new WorkoutEntity({
        ...input,
        authorId,
        exercises: exercisesProps,
      });
      await this.workoutRepository.insert(entity);
      return WorkoutOutputMapper.toOutput(entity);
    }
  }
}
