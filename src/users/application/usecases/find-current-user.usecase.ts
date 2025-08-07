import { IUsecase } from '../../../shared/application/usecases/usecase.interface';
import { UserOutput, UserOutputMapper } from '../outputs/user.output';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { BadRequestError } from '../../../shared/application/errors/bad-request.error';
import { ErrorCodes } from '../../../shared/domain/enums/error-codes.enum';

export namespace FindCurrentUserUseCase {
  export type Input = {};

  export type Output = UserOutput;

  export class UseCase implements IUsecase<Input, Output> {
    constructor(private userRepository: IUserRepository.Repository) {}

    async execute(input: Input, token?: string): Promise<UserOutput> {
      if (!token) {
        throw new BadRequestError(ErrorCodes.ID_NOT_PROVIDED);
      }
      const entity = await this.userRepository.findByToken(token);
      return UserOutputMapper.toOutput(entity);
    }
  }
}
