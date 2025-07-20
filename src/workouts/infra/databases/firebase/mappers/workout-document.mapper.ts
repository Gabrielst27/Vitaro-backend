import { ExerciseEntity } from '../../../../domain/entities/exercise.entity';
import { SerieEntity } from '../../../../domain/entities/serie.entity';
import { WorkoutEntity } from '../../../../domain/entities/workout.entity';
import { EWorkoutCategories } from '../../../../domain/enums/workout-categories.enum';
import { EWorkoutSports } from '../../../../domain/enums/workout-sports.enum';

export type WorkoutDocument = {
  title: string;
  category: EWorkoutCategories;
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

  static exerciseToDocument(entity: ExerciseEntity): ExerciseDocument {
    return entity.props;
  }

  static serieToDocument(entity: SerieEntity) {
    return entity.props;
  }
}
