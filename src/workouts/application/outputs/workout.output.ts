import { WorkoutEntity } from '../../domain/entities/workout.entity';
import { EWorkoutCategories } from '../../domain/enums/workout-categories.enum';
import { EWorkoutSports } from '../../domain/enums/workout-sports.enum';

export type WorkoutOutput = {
  id: string;
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

export class WorkoutOutputMapper {
  static toOutput(entity: WorkoutEntity): WorkoutOutput {
    return {
      id: entity.id,
      ...entity.props,
      exercises: entity.props.exercises.map((exercise) => {
        return {
          ...exercise.props,
          series: exercise.props.series.map((serie) => {
            return serie.props;
          }),
        };
      }),
    };
  }
}
