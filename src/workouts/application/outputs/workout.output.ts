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

export class WorkoutOutputMapper {
  static toOutput(entity: WorkoutEntity): WorkoutOutput {
    return {
      id: entity.id,
      ...entity.props,
      exercises: entity.props.exercises.map((exercise) => {
        return {
          ...exercise,
          series: exercise.series.map((serie) => {
            return serie;
          }),
        };
      }),
    };
  }
}
