import { PostgrestError } from '@supabase/supabase-js';
import { ForbiddenError } from '../../../../../shared/application/errors/forbidden.error';
import { UnauthorizedError } from '../../../../../shared/application/errors/unauthorized.error';
import { ErrorCodes } from '../../../../../shared/domain/enums/error-codes.enum';
import { SearchParams } from '../../../../../shared/domain/repositories/search-params.repository';
import { SupabaseService } from '../../../../../shared/infra/supabase/supabase.service';
import { ExerciseEntity } from '../../../../domain/entities/exercise.entity';
import { SerieEntity } from '../../../../domain/entities/serie.entity';
import { WorkoutEntity } from '../../../../domain/entities/workout.entity';
import { IWorkoutRepository } from '../../../../domain/repositories/workout.repository.interface';
import {
  ExerciseTableMapper,
  SerieTable,
  SerieTableMapper,
  WorkoutTableMapper,
} from '../mappers/workout-table.mapper';
import { ApplicationError } from '../../../../../shared/application/errors/application.error';
import { DomainError } from '../../../../../shared/domain/errors/domain.error';
import { ConflictError } from '../../../../../shared/application/errors/conflict.error';

export class WorkoutSupabaseRepository
  implements IWorkoutRepository.Repository
{
  sortableFields: string[];
  searchableFields: string[];
  insensitiveFields: string[];
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

  search(params: SearchParams): Promise<IWorkoutRepository.SearchOutput> {
    throw new Error('Method not implemented.');
  }

  async insert(entity: WorkoutEntity): Promise<void> {
    if (!this.token)
      throw new UnauthorizedError(ErrorCodes.USER_NOT_AUTHENTICATED);
    const model = WorkoutTableMapper.toTable(entity);
    try {
      const client = await this.supabaseService.getAuthenticatedClient(
        this.token,
      );
      const user = await client.auth.getUser();
      if (user.error) this.supabaseService.verifiyUserError(user.error);
      if (user.data.user!.id !== entity.authorId) {
        throw new ForbiddenError(ErrorCodes.FORBIDDEN);
      }
      const workoutResult = await client.from(this.table).insert([model]);
      if (workoutResult.error)
        this.supabaseService.verifyOperationError(workoutResult.error);
      const userWorkoutsResult = await client
        .from(this.userWorkoutsTable)
        .insert([{ user_id: entity.authorId, workout_id: entity.id }]);
      if (userWorkoutsResult.error)
        this.supabaseService.verifiyUserError(userWorkoutsResult.error);
      const seriesModels: SerieTable[] = [];
      const exercisesModels = entity.exercises.map((exercise) => {
        seriesModels.push(
          ...exercise.series.map((serie) =>
            SerieTableMapper.toTable(serie, exercise.id!),
          ),
        );
        return ExerciseTableMapper.toTable(exercise, entity.id!);
      });
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
