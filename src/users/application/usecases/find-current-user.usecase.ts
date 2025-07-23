import { IUsecase } from '../../../shared/application/usecases/usecase.interface';
import { UserOutput, UserOutputMapper } from '../outputs/user.output';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { BadRequestError } from '../../../shared/application/errors/bad-request.error';

export namespace FindCurrentUserUseCase {
  export type Input = {};

  export type Output = UserOutput;

  export class UseCase implements IUsecase<Input, Output> {
    constructor(private userRepository: IUserRepository.Repository) {}

    async execute(input: Input, userId?: string): Promise<UserOutput> {
      if (!userId) {
        throw new BadRequestError('User id not provided');
      }
      const entity = await this.userRepository.findById(userId);
      return UserOutputMapper.toOutput(entity);
    }
  }
}
