import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { IUsecase } from '../../../shared/application/usecases/usecase.interface';
import {
  AuthenticatedUserOutput,
  AuthenticatedUserOutputMapper,
} from '../outputs/authenticated-user.output';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { IAuthService } from '../../../auth/application/auth.service.interface';
import { UserIdentity } from '../../../auth/application/outputs/user-identity.output';

export namespace UserSignInUsecase {
  export type Input = {
    email: string;
    password: string;
  };

  export type Output = AuthenticatedUserOutput;

  export class UseCase implements IUsecase<Input, Output> {
    constructor(
      private userRepository: IUserRepository.Repository,
      private authService: IAuthService,
    ) {}

    async execute(input: Input): Promise<AuthenticatedUserOutput> {
      if (!input.email || !input.password) {
        throw new BadRequestException('Input not provided');
      }
      const identity = await this.authService.signInFirebase(
        input.email,
        input.password,
      );
      if (!identity) {
        throw new UnauthorizedException('Authentication failed');
      }
      const entity = await this.userRepository.findById(identity.uid);
      return AuthenticatedUserOutputMapper.toOutput(entity, identity.token);
    }
  }
}
