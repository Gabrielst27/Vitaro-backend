import { ExerciseEntity } from '../../../../domain/entities/exercise.entity';
import { SerieEntity } from '../../../../domain/entities/serie.entity';
import { WorkoutEntity } from '../../../../domain/entities/workout.entity';
import { EWorkoutGoals } from '../../../../domain/enums/workout-goals.enum';
import { EWorkoutSports } from '../../../../domain/enums/workout-sports.enum';

export type WorkoutTable = {
  id?: string;
  author_id: string;
  title: string;
  goal: EWorkoutGoals;
  sport: EWorkoutSports;
  created_at: Date;
  updated_at: Date;
};

export class WorkoutTableMapper {
  static toTable(entity: WorkoutEntity): WorkoutTable {
    const props = entity.toJSON();
    return {
      id: props.id,
      author_id: props.authorId,
      title: props.title,
      goal: props.goal,
      sport: props.sport,
      created_at: props.createdAt,
      updated_at: props.updatedAt,
    };
  }
}

export type ExerciseTable = {
  id: string;
  ref_id: string;
  workout_id: string;
};

export class ExerciseTableMapper {
  static toTable(entity: ExerciseEntity, workoutId: string): ExerciseTable {
    const props = entity.toJSON();
    return {
      id: props.id,
      ref_id: props.refId,
      workout_id: workoutId,
    };
  }
}

export type SerieTable = {
  id: string;
  position: number;
  reps: number;
  rest_in_seconds: number;
  weight: number | null;
  technique_id: string | null;
  accessory: string | null;
  exercise_id: string;
};

export class SerieTableMapper {
  static toTable(entity: SerieEntity, exerciseId: string): SerieTable {
    const props = entity.toJSON();
    return {
      id: props.id,
      position: props.position,
      reps: props.reps,
      rest_in_seconds: props.restInSeconds,
      weight: props.weight,
      technique_id: props.techniqueId,
      accessory: props.accessory,
      exercise_id: exerciseId,
    };
  }
}
