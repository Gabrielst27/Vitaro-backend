import { BadRequestException } from '@nestjs/common';
import { IUsecase } from '../../../shared/application/usecases/usecase.interface';
import { EWorkoutCategories } from '../../domain/enums/workout-categories.enum';
import { EWorkoutSports } from '../../domain/enums/workout-sports.enum';
import { IWorkoutRepository } from '../../domain/repositories/workout.repository.interface';
import { WorkoutOutput, WorkoutOutputMapper } from '../outputs/workout.output';
import { WorkoutEntity } from '../../domain/entities/workout.entity';
import { SerieProps } from '../../domain/entities/serie.entity';
import { ExerciseProps } from '../../domain/entities/exercise.entity';

export namespace CreateWorkoutUseCase {
  export type Input = {
    title: string;
    category: EWorkoutCategories;
    sport: EWorkoutSports;
    exercises: {
      refId: string;
      name: string;
      series: {
        position: number;
        weight: number;
        reps: number;
        restInSeconds?: number;
        technique?: string;
        accessory?: string;
      }[];
    }[];
  };
  export type Output = WorkoutOutput;
  export class UseCase implements IUsecase<Input, Output> {
    constructor(private workoutRepository: IWorkoutRepository.Repository) {}

    async execute(input: Input): Promise<WorkoutOutput> {
      const { title, category, sport, exercises } = input;
      if (!title || !category || !sport || !exercises) {
        throw new BadRequestException('Workout input not provided');
      }
      if (exercises.length < 1) {
        throw new BadRequestException('Workout must have at least 1 exercise');
      }
      for (let exercise of exercises) {
        if (exercise.series.length < 1) {
          throw new BadRequestException(
            exercise.name,
            ' must have at least 1 serie',
          );
        }
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
      const entity = new WorkoutEntity({ ...input, exercises: exercisesProps });
      await this.workoutRepository.insert(entity);
      return WorkoutOutputMapper.toOutput(entity);
    }
  }
}
