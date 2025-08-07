import { IUsecase } from '../../../shared/application/usecases/usecase.interface';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { IAuthService } from '../../../auth/application/auth.service.interface';
import { UserEntity } from '../../domain/entities/user-entity';
import { ERole } from '../../../shared/domain/enums/role.enum';
import {
  AuthenticatedUserOutput,
  AuthenticatedUserOutputMapper,
} from '../outputs/authenticated-user.output';
import { BadRequestError } from '../../../shared/application/errors/bad-request.error';
import { ErrorCodes } from '../../../shared/domain/enums/error-codes.enum';
import { UnauthorizedError } from '../../../shared/application/errors/unauthorized.error';

export namespace UserSignUpUsecase {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export type Ouput = AuthenticatedUserOutput;

  export class UseCase implements IUsecase<Input, Ouput> {
    constructor(
      private userRepository: IUserRepository.Repository,
      private authService: IAuthService,
    ) {}

    async execute(
      input: Input,
      token?: string,
    ): Promise<AuthenticatedUserOutput> {
      if (!token) {
        throw new UnauthorizedError(ErrorCodes.USER_NOT_AUTHENTICATED);
      }
      const { name, email, password } = input;
      if (!name || !email || !password) {
        throw new BadRequestError(ErrorCodes.INPUT_NOT_PROVIDED);
      }
      await this.userRepository.emailExists(email);
      const entity = new UserEntity({
        name,
        email,
        isActive: false,
        role: ERole.COMMON,
      });
      const authUser = await this.authService.createUser(entity, password);
      entity.updateId(authUser.id);
      entity.props.isActive = true;
      await this.userRepository.insert(entity);
      return AuthenticatedUserOutputMapper.toOutput(entity, authUser.token);
    }
  }
}
