import { WorkoutEntity } from '../../domain/entities/workout.entity';
import { EWorkoutGoals } from '../../domain/enums/workout-goals.enum';
import { EWorkoutSports } from '../../domain/enums/workout-sports.enum';

export type WorkoutOutput = {
  id: string;
  authorId: string;
  title: string;
  goal: EWorkoutGoals;
  sport: EWorkoutSports;
  exercises: {
    id: string;
    refId: string;
    series: {
      id: string;
      weight: number | null;
      reps: number;
      restInSeconds: number;
      techniqueId: string | null;
      accessory: string | null;
    }[];
  }[];
};

export class WorkoutOutputMapper {
  static toOutput(entity: WorkoutEntity): WorkoutOutput {
    const exercisesProps: WorkoutOutput['exercises'] = entity.exercises.map(
      (exercise) => {
        return {
          ...exercise.toJSON(),
          series: exercise.series.map((serie) => serie.toJSON()),
        };
      },
    );
    return { ...entity.toJSON(), exercises: exercisesProps };
  }
}
