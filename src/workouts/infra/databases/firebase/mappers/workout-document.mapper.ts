import { WorkoutEntity } from '../../../../domain/entities/workout.entity';
import { EWorkoutGoals } from '../../../../domain/enums/workout-categories.enum';
import { EWorkoutSports } from '../../../../domain/enums/workout-sports.enum';

export type WorkoutDocument = {
  title: string;
  goal: EWorkoutGoals;
  sport: EWorkoutSports;
};

export type ExerciseDocument = {
  refId: string;
  name: string;
};

export type SerieDocument = {
  weight: number;
  reps: number;
  restInSeconds?: number;
  technique?: string;
  accessory?: string;
};

export class WorkoutDocumentMapper {
  static workoutToDocument(entity: WorkoutEntity): WorkoutDocument {
    return entity.props;
  }
}
