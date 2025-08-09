import {
  PaginationOutput,
  PaginationOutputMapper,
} from '../../../shared/application/outputs/pagination-output';
import { IUsecase } from '../../../shared/application/usecases/usecase.interface';
import { IWorkoutRepository } from '../../domain/repositories/workout.repository.interface';
import { WorkoutOutput, WorkoutOutputMapper } from '../outputs/workout.output';
import {
  CustomQuery,
  QueryProps,
  SearchParams,
  SearchProps,
} from '../../../shared/domain/repositories/search-params.repository';
import { BadRequestError } from '../../../shared/application/errors/bad-request.error';
import { ErrorCodes } from '../../../shared/domain/enums/error-codes.enum';
import { EOperators } from '../../../shared/domain/enums/firebase-operators.enum';
import { UnauthorizedError } from '../../../shared/application/errors/unauthorized.error';

export namespace ListUserWorkoutsUseCase {
  export type Input = SearchProps & { userId: string };
  export type Output = PaginationOutput<WorkoutOutput>;

  export class UseCase implements IUsecase<Input, Output> {
    constructor(private workoutRepository: IWorkoutRepository.Repository) {}

    async execute(input: Input, token?: string): Promise<Output> {
      if (!token) {
        throw new UnauthorizedError(ErrorCodes.USER_NOT_AUTHENTICATED);
      }
      if (!input.userId) {
        throw new BadRequestError(ErrorCodes.ID_NOT_PROVIDED);
      }
      this.workoutRepository.setToken(token);
      const query: QueryProps = {
        field: 'author_id',
        comparisonOperator: EOperators.EQUALS,
        filter: input.userId,
      };
      const queries: CustomQuery[] = [new CustomQuery(query)];
      const params = new SearchParams({ ...input, queries });
      const result = await this.workoutRepository.search(params);
      return this.toOutput(result);
    }

    private toOutput(result: IWorkoutRepository.SearchOutput) {
      const outputs: WorkoutOutput[] = [];
      for (let item of result.items) {
        outputs.push(WorkoutOutputMapper.toOutput(item));
      }
      return PaginationOutputMapper.toOutput(outputs, result);
    }
  }
}
