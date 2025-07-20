import { ConflictException } from '@nestjs/common';
import { SearchParams } from '../../../../../shared/domain/repositories/search-params.repository';
import { FirebaseService } from '../../../../../shared/infra/database/firebase/firebase.service';
import { ExerciseEntity } from '../../../../domain/entities/exercise.entity';
import { SerieEntity } from '../../../../domain/entities/serie.entity';
import { WorkoutEntity } from '../../../../domain/entities/workout.entity';
import { IWorkoutRepository } from '../../../../domain/repositories/workout.repository.interface';
import { WorkoutDocumentMapper } from '../mappers/workout-document.mapper';

export class WorkoutFirebaseRepository
  implements IWorkoutRepository.Repository
{
  sortableFields: string[];
  searchableFields: string[];
  dateFields: string[];
  collection: string = 'workouts';
  exercisesSubcollection: string = 'exercises';
  seriesSubcollection: string = 'series';

  constructor(private firebaseService: FirebaseService) {}

  async titleExists(title: string): Promise<void> {
    const firestore = await this.firebaseService.getFirestoreDb();
    const snapshot = await firestore
      .collection(this.collection)
      .where('title', '==', title)
      .get();
    if (!snapshot.empty) {
      throw new ConflictException(
        `Workout with the title ${title} already exists`,
      );
    }
  }

  findExercises(workoutId: string): Promise<ExerciseEntity[]> {
    throw new Error('Method not implemented.');
  }

  addExercise(exercise: ExerciseEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }

  removeExercise(exerciseId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  editExercise(exercise: ExerciseEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findSeries(exerciseId: string): Promise<SerieEntity[]> {
    throw new Error('Method not implemented.');
  }

  addSeries(exerciseId: string, series: SerieEntity[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  removeSeries(exerciseId: string, seriesIds: string[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  editSerie(exerciseId: string, serie: SerieEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }

  search(params: SearchParams): IWorkoutRepository.SearchOutput {
    throw new Error('Method not implemented.');
  }

  async insert(entity: WorkoutEntity): Promise<void> {
    const firestore = await this.firebaseService.getFirestoreDb();
    const workoutDocument = WorkoutDocumentMapper.workoutToDocument(entity);
    const workoutDocRef = await firestore
      .collection(this.collection)
      .doc(entity.id);
    await workoutDocRef.set(workoutDocument);
    for (const exercise of entity.props.exercises) {
      const exerciseDocument =
        WorkoutDocumentMapper.exerciseToDocument(exercise);
      const exerciseDocRef = await workoutDocRef
        .collection(this.exercisesSubcollection)
        .doc(exercise.id);
      await exerciseDocRef.set(exerciseDocument);
      for (const serie of exercise.props.series) {
        const serieDocument = WorkoutDocumentMapper.serieToDocument(serie);
        const serieDocRef = await exerciseDocRef
          .collection(this.seriesSubcollection)
          .doc(serie.id);
        await serieDocRef.set(serieDocument);
      }
    }
  }

  findById(id: string): Promise<WorkoutEntity> {
    throw new Error('Method not implemented.');
  }

  update(entity: WorkoutEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
