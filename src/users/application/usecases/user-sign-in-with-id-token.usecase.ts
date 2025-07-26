import { IUsecase } from '../../../shared/application/usecases/usecase.interface';
import {} from '../outputs/authenticated-user.output';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { IAuthService } from '../../../auth/application/auth.service.interface';
import { UserOutput, UserOutputMapper } from '../outputs/user.output';
import { BadRequestError } from '../../../shared/application/errors/bad-request.error';
import { ErrorCodes } from '../../../shared/domain/enums/error-codes.enum';

export namespace UserSignInWithIdTokenUsecase {
  export type Input = {
    idToken: string;
  };

  export type Output = UserOutput;

  export class UseCase implements IUsecase<Input, Output> {
    constructor(
      private userRepository: IUserRepository.Repository,
      private authService: IAuthService,
    ) {}

    async execute(input: Input): Promise<UserOutput> {
      if (!input.idToken) {
        throw new BadRequestError(ErrorCodes.INPUT_NOT_PROVIDED);
      }
      const id = await this.authService.signInFirebase(input.idToken);
      const entity = await this.userRepository.findById(id);
      return UserOutputMapper.toOutput(entity);
    }
  }
}
