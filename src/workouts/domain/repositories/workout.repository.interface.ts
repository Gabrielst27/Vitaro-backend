import { SearchParams } from '../../../shared/domain/repositories/search-params.repository';
import { SearchResult } from '../../../shared/domain/repositories/search-result.repository';
import { ISearchableRepository } from '../../../shared/domain/repositories/searchable.repository.interface';
import { ExerciseEntity } from '../entities/exercise.entity';
import { SerieEntity } from '../entities/serie.entity';
import { WorkoutEntity } from '../entities/workout.entity';

export namespace IWorkoutRepository {
  export type SearchInput = SearchParams;
  export type SearchOutput = SearchResult<WorkoutEntity>;
  export interface Repository
    extends ISearchableRepository<WorkoutEntity, SearchInput, SearchOutput> {
    findExercises(workoutId: string): Promise<ExerciseEntity[]>;
    addExercise(exercise: ExerciseEntity): Promise<void>;
    removeExercise(exerciseId: string): Promise<void>;
    editExercise(exercise: ExerciseEntity): Promise<void>;
    findSeries(exerciseId: string): Promise<SerieEntity[]>;
    addSeries(exerciseId: string, series: SerieEntity[]): Promise<void>;
    removeSeries(exerciseId: string, seriesIds: string[]): Promise<void>;
    editSerie(exerciseId: string, serie: SerieEntity): Promise<void>;
  }
}
