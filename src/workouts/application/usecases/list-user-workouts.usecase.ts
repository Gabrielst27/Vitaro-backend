import { BadRequestException } from '@nestjs/common';
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '../../../shared/application/outputs/pagination-output';
import { IUsecase } from '../../../shared/application/usecases/usecase.interface';
import { IWorkoutRepository } from '../../domain/repositories/workout.repository.interface';
import { WorkoutOutput, WorkoutOutputMapper } from '../outputs/workout.output';
import { EFirebaseOperators } from '../../../shared/domain/enums/firebase-operators.enum';
import {
  CustomQuery,
  QueryProps,
  SearchParams,
  SearchProps,
} from '../../../shared/domain/repositories/search-params.repository';

export namespace ListUserWorkoutsUseCase {
  export type Input = SearchProps & { userId: string };
  export type Output = PaginationOutput<WorkoutOutput>;

  export class UseCase implements IUsecase<Input, Output> {
    constructor(private workoutRepository: IWorkoutRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.userId) {
        throw new BadRequestException('userId not provided');
      }
      const query: QueryProps = {
        field: 'authorId',
        comparisonOperator: EFirebaseOperators.EQUALS,
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
