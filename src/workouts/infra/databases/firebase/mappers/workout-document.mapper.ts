import { Timestamp } from 'firebase-admin/firestore';
import { WorkoutEntity } from '../../../../domain/entities/workout.entity';
import { EWorkoutGoals } from '../../../../domain/enums/workout-goals.enum';
import { EWorkoutSports } from '../../../../domain/enums/workout-sports.enum';

export type WorkoutDocument = {
  authorId: string;
  title: string;
  goal: EWorkoutGoals;
  sport: EWorkoutSports;
  exercises: {
    refId: string;
    series: {
      position: number;
      weight: number | null;
      reps: number;
      restInSeconds: number;
      techniqueId: string | null;
      accessory: string | null;
    }[];
  }[];
  createdAt: Date;
  updatedAt: Date;
};

export class WorkoutDocumentMapper {
  static toDocument(entity: WorkoutEntity): WorkoutDocument {
    const exercises: WorkoutDocument['exercises'] = [];
    for (const exercise of entity.exercises) {
      const series: WorkoutDocument['exercises'][number]['series'] = [];
      for (const serie of exercise.series) {
        series.push(serie.toJSON());
      }
      exercises.push({
        ...exercise.toJSON(),
        series,
      });
    }
    return {
      ...entity.toJSON(),
      exercises,
    };
  }

  static toEntity(document: WorkoutDocument, id: string): WorkoutEntity {
    const createdAt: Date =
      WorkoutDocumentMapper.convertDate(document.createdAt) || new Date();
    const updatedAt: Date =
      WorkoutDocumentMapper.convertDate(document.updatedAt) || new Date();
    return new WorkoutEntity({ ...document, createdAt, updatedAt }, id);
  }

  private static convertDate(value: any): Date | undefined {
    if (!value) return undefined;
    if (value instanceof Date) return value;
    if (value instanceof Timestamp) return value.toDate();
    return new Date(value);
  }
}
