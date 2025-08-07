import {
  ExerciseEntity,
  ExerciseProps,
} from '../../../../domain/entities/exercise.entity';
import {
  SerieEntity,
  SerieProps,
} from '../../../../domain/entities/serie.entity';
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
  exercises?: ExerciseTable[];
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

  static toEntity(table: WorkoutTable): WorkoutEntity {
    const { created_at, author_id, updated_at, ...cleanProps } = table;
    return new WorkoutEntity({
      ...cleanProps,
      authorId: table.author_id,
      createdAt: new Date(table.created_at),
      updatedAt: new Date(table.updated_at),
      exercises: table.exercises
        ? table.exercises.map((e) => ExerciseTableMapper.toProps(e))
        : [],
    });
  }
}

export type ExerciseTable = {
  id: string;
  ref_id: string;
  workout_id: string;
  series?: SerieTable[];
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

  static toProps(table: ExerciseTable): ExerciseProps {
    const props = {
      id: table.id,
      refId: table.ref_id,
      series: table.series
        ? table.series.map((s) => SerieTableMapper.toProps(s))
        : [],
    };
    return props;
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

  static toProps(table: SerieTable): SerieProps {
    const { rest_in_seconds, technique_id, exercise_id, ...cleanProps } = table;
    return {
      ...cleanProps,
      reps: Number(table.reps),
      position: Number(table.position),
      restInSeconds: Number(table.rest_in_seconds),
      weight: table.weight ? Number(table.weight) : null,
      techniqueId: table.technique_id,
    };
  }
}
