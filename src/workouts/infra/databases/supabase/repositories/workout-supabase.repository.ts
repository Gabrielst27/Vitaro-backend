import { ForbiddenError } from '../../../../../shared/application/errors/forbidden.error';
import { UnauthorizedError } from '../../../../../shared/application/errors/unauthorized.error';
import { ErrorCodes } from '../../../../../shared/domain/enums/error-codes.enum';
import { SearchParams } from '../../../../../shared/domain/repositories/search-params.repository';
import { SupabaseService } from '../../../../../shared/infra/supabase/supabase.service';
import { ExerciseEntity } from '../../../../domain/entities/exercise.entity';
import { SerieEntity } from '../../../../domain/entities/serie.entity';
import { WorkoutEntity } from '../../../../domain/entities/workout.entity';
import { IWorkoutRepository } from '../../../../domain/repositories/workout.repository.interface';
import { ApplicationError } from '../../../../../shared/application/errors/application.error';
import { DomainError } from '../../../../../shared/domain/errors/domain.error';
import { ConflictError } from '../../../../../shared/application/errors/conflict.error';
import {
  ExerciseTableMapper,
  SerieTable,
  SerieTableMapper,
  WorkoutTableMapper,
} from '../mappers/workout-table.mapper';
import { ValidationError } from '../../../../../shared/domain/errors/validation.error';
import { EOperators } from '../../../../../shared/domain/enums/firebase-operators.enum';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { SearchResult } from '../../../../../shared/domain/repositories/search-result.repository';

export class WorkoutSupabaseRepository
  implements IWorkoutRepository.Repository
{
  sortableFields: string[] = ['title', 'created_at', 'updated_at'];
  searchableFields: string[] = ['author_id', 'title', 'goal', 'sport'];
  insensitiveFields: string[] = ['title', 'goal', 'sport'];
  token?: string;
  table: string = 'workouts';
  exercisesTable: string = 'exercises';
  seriesTable: string = 'series';
  userWorkoutsTable: string = 'user_workouts';

  constructor(private supabaseService: SupabaseService) {}

  setToken(token: string): void {
    this.token = token;
  }

  async titleExists(title: string): Promise<void> {
    if (!this.token) {
      throw new UnauthorizedError(ErrorCodes.USER_NOT_AUTHENTICATED);
    }
    try {
      const client = await this.supabaseService.getAuthenticatedClient(
        this.token,
      );
      const result = await client
        .from(this.table)
        .select('id')
        .eq('title', title);
      if (result.data && result.data.length > 0) {
        throw new ConflictError(ErrorCodes.TITLE_ALREADY_EXISTS);
      }
    } catch (error) {
      if (error instanceof ApplicationError || error instanceof DomainError) {
        throw error;
      }
      throw new Error(ErrorCodes.UNKNOWN_ERROR);
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
    if (!this.token)
      throw new UnauthorizedError(ErrorCodes.USER_NOT_AUTHENTICATED);
    const client = await this.supabaseService.getAuthenticatedClient(
      this.token,
    );
    let queries = client.from(this.table).select(`
        *, 
          exercises (
            *,
            series (*)
          )
      `);
    if (params.queries)
      params.queries.map((query) => {
        if (!this.searchableFields.includes(query.field))
          throw new ValidationError(ErrorCodes.INVALID_QUERY);
        switch (query.comparisonOperator) {
          case EOperators.EQUALS:
            queries = queries.eq(query.field, query.filter);
            break;
          case EOperators.DIFF:
            PostgrestFilterBuilder;
            queries = queries.neq(query.field, query.filter);
            break;
          case EOperators.LESSER:
            queries = queries.lt(query.field, query.filter);
            break;
          case EOperators.LESSEQUAL:
            queries = queries.lte(query.field, query.filter);
            break;
          case EOperators.GREATER:
            queries = queries.gt(query.field, query.filter);
            break;
          case EOperators.GREATEQUAL:
        }
      });
    const sortField = params.sortField
      ? this.sortableFields.includes(params.sortField)
        ? params.sortField
        : 'title'
      : 'title';
    const sortDirection = params.sortDirection ?? 'desc';
    queries.order(sortField, { ascending: sortDirection === 'asc' });
    const perPage = params.perPage && params.perPage >= 1 ? params.perPage : 20;
    const page = params.page && params.page >= 0 ? params.page : 0;
    const start = page * perPage;
    const end = page + perPage - 1;
    queries.range(start, end);
    const result = await queries;
    const items = result.data
      ? result.data.map((item) => WorkoutTableMapper.toEntity(item))
      : [];
    return new SearchResult({
      items,
      total: items.length,
      currentPage: page,
      perPage,
      sort: sortField,
      sortDir: sortDirection,
    });
  }

  async insert(entity: WorkoutEntity): Promise<void> {
    if (!this.token)
      throw new UnauthorizedError(ErrorCodes.USER_NOT_AUTHENTICATED);
    const model = WorkoutTableMapper.toTable(entity);
    const client = await this.supabaseService.getAuthenticatedClient(
      this.token,
    );
    const user = await client.auth.getUser();
    if (user.error) this.supabaseService.verifyUserError(user.error);
    if (user.data.user!.id !== entity.authorId) {
      throw new ForbiddenError(ErrorCodes.FORBIDDEN);
    }
    const seriesModels: SerieTable[] = [];
    const exercisesModels = entity.exercises.map((exercise) => {
      seriesModels.push(
        ...exercise.series.map((serie) =>
          SerieTableMapper.toTable(serie, exercise.id!),
        ),
      );
      return ExerciseTableMapper.toTable(exercise, entity.id!);
    });
    try {
      const workoutResult = await client.from(this.table).insert([model]);
      if (workoutResult.error)
        this.supabaseService.verifyOperationError(workoutResult.error);
      const userWorkoutsResult = await client
        .from(this.userWorkoutsTable)
        .insert([{ user_id: entity.authorId, workout_id: entity.id }]);
      if (userWorkoutsResult.error)
        this.supabaseService.verifyOperationError(userWorkoutsResult.error);
      const exercisesResult = await client
        .from(this.exercisesTable)
        .insert([...exercisesModels]);
      if (exercisesResult.error)
        this.supabaseService.verifyOperationError(exercisesResult.error);
      const seriesResult = await client
        .from(this.seriesTable)
        .insert([...seriesModels]);
      if (seriesResult.error)
        this.supabaseService.verifyOperationError(seriesResult.error);
    } catch (error) {
      await client.from(this.table).delete().eq('id', entity.id);
      if (error instanceof ApplicationError || error instanceof DomainError) {
        throw error;
      }
      throw new Error(ErrorCodes.UNKNOWN_ERROR);
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
