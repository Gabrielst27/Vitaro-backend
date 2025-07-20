import { BadRequestException } from '@nestjs/common';
import { IUsecase } from '../../../shared/application/usecases/usecase.interface';
import { EWorkoutCategories } from '../../domain/enums/workout-categories.enum';
import { EWorkoutSports } from '../../domain/enums/workout-sports.enum';
import { IWorkoutRepository } from '../../domain/repositories/workout.repository.interface';
import { WorkoutOutput, WorkoutOutputMapper } from '../outputs/workout.output';
import { WorkoutEntity } from '../../domain/entities/workout.entity';
import { SerieEntity } from '../../domain/entities/serie.entity';
import { ExerciseEntity } from '../../domain/entities/exercise.entity';

export namespace CreateWorkoutUseCase {
  export type Input = {
    title: string;
    category: EWorkoutCategories;
    sport: EWorkoutSports;
    exercises: {
      refId: string;
      name: string;
      series: {
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
      const exerciseEntities: ExerciseEntity[] = [];
      for (let exercise of exercises) {
        const serieEntities: SerieEntity[] = [];
        let position: number = 0;
        for (let serie of exercise.series) {
          serieEntities.push(new SerieEntity({ ...serie, position: position }));
          position++;
        }
        exerciseEntities.push(
          new ExerciseEntity({ ...exercise, series: serieEntities }),
        );
      }
      const entity = new WorkoutEntity({
        ...input,
        exercises: exerciseEntities,
      });
      await this.workoutRepository.insert(entity);
      return WorkoutOutputMapper.toOutput(entity);
    }
  }
}
