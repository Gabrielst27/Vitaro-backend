import { ConflictException } from '@nestjs/common';
import { SearchParams } from '../../../../../shared/domain/repositories/search-params.repository';
import { ExerciseEntity } from '../../../../domain/entities/exercise.entity';
import { SerieEntity } from '../../../../domain/entities/serie.entity';
import { WorkoutEntity } from '../../../../domain/entities/workout.entity';
import { IWorkoutRepository } from '../../../../domain/repositories/workout.repository.interface';
import {
  WorkoutDocument,
  WorkoutDocumentMapper,
} from '../mappers/workout-document.mapper';
import { EFirebaseOperators } from '../../../../../shared/domain/enums/firebase-operators.enum';
import { SearchResult } from '../../../../../shared/domain/repositories/search-result.repository';
import { BadRequestError } from '../../../../../shared/application/errors/bad-request.error';
import { NotFoundError } from '../../../../../shared/application/errors/not-found.error';
import { ErrorCodes } from '../../../../../shared/domain/enums/error-codes.enum';
import { FirebaseService } from '../../../../../shared/infra/firebase/firebase.service';

export class WorkoutFirebaseRepository
  implements IWorkoutRepository.Repository
{
  sortableFields: string[] = [
    'title',
    'goal',
    'sport',
    'createdAt',
    'updatedAt',
  ];
  searchableFields: string[] = [
    'authorId',
    'title',
    'goal',
    'sport',
    'createdAt',
    'updatedAt',
  ];
  insensitiveFields: string[] = ['title', 'goal', 'sport'];
  collection: string = 'workouts';
  exercisesArray: string = 'exercises';
  seriesArray: string = 'series';

  constructor(private firebaseService: FirebaseService) {}

  async titleExists(title: string): Promise<void> {
    const firestore = await this.firebaseService.getFirestoreDb();
    const snapshot = await firestore
      .collection(this.collection)
      .where('title', EFirebaseOperators.EQUALS, title)
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

  async search(params: SearchParams): Promise<IWorkoutRepository.SearchOutput> {
    const sortBy =
      params.sortField && this.sortableFields.includes(params.sortField)
        ? params.sortField
        : 'title';
    const sortDirection =
      (params.sortDirection && params.sortDirection === 'asc') ||
      params.sortDirection === 'desc'
        ? params.sortDirection
        : 'desc';
    const currentPage =
      Number.isInteger(params.page) && params.page >= 0 ? params.page : 0;
    const perPage =
      Number.isInteger(params.perPage) && params.perPage >= 1
        ? params.perPage
        : 20;
    const firestore = await this.firebaseService.getFirestoreDb();
    let query: FirebaseFirestore.Query = firestore.collection(this.collection);
    if (params.queries) {
      for (const filter of params.queries) {
        if (!this.searchableFields.includes(filter.field)) {
          throw new BadRequestError(
            `${filter.field} is not a searchable field`,
          );
        }
        query = query.where(
          filter.field,
          filter.comparisonOperator,
          filter.filter,
        );
      }
    }
    query = query.orderBy(sortBy, sortDirection).limit(perPage);
    if (currentPage > 0) {
      query = query.startAfter(currentPage);
    }
    const snapshot = await query.get();
    const entities: WorkoutEntity[] = [];
    for (const item of snapshot.docs) {
      const doc = item.data();
      entities.push(
        WorkoutDocumentMapper.toEntity(doc as WorkoutDocument, item.id),
      );
    }
    return new SearchResult<WorkoutEntity>({
      items: entities,
      total: entities.length,
      currentPage,
      perPage: perPage,
      sort: sortBy,
      sortDir: sortDirection,
      query,
    });
  }

  async insert(entity: WorkoutEntity): Promise<void> {
    const firestore = await this.firebaseService.getFirestoreDb();
    const workoutDocument = WorkoutDocumentMapper.toDocument(entity);
    const workoutDocRef = await firestore
      .collection(this.collection)
      .doc(entity.id);
    await workoutDocRef.set(workoutDocument);
  }

  async findById(id: string): Promise<WorkoutEntity> {
    const firestore = await this.firebaseService.getFirestoreDb();
    const snapshot = await firestore.collection(this.collection).doc(id).get();
    const data = snapshot.data();
    if (!data) {
      throw new NotFoundError(ErrorCodes.WORKOUT_NOT_FOUND);
    }
    return WorkoutDocumentMapper.toEntity(data as WorkoutDocument, id);
  }

  async update(entity: WorkoutEntity): Promise<void> {
    const document = WorkoutDocumentMapper.toDocument(entity);
    const firestore = await this.firebaseService.getFirestoreDb();
    await firestore.collection(this.collection).doc(entity.id).set(document);
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
