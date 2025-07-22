import { BadRequestException } from '@nestjs/common';
import { IUsecase } from '../../../shared/application/usecases/usecase.interface';
import { UserOutput, UserOutputMapper } from '../outputs/user.output';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';

export namespace FindCurrentUserUseCase {
  export type Input = {};

  export type Output = UserOutput;

  export class UseCase implements IUsecase<Input, Output> {
    constructor(private userRepository: IUserRepository.Repository) {}

    async execute(input: Input, userId?: string): Promise<UserOutput> {
      if (!userId) {
        throw new BadRequestException('User id not provided');
      }
      const entity = await this.userRepository.findById(userId);
      return UserOutputMapper.toOutput(entity);
    }
  }
}
