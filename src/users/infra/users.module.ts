import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AuthModule } from '../../auth/infra/auth.module';
import { UserSignUpUsecase } from '../application/usecases/user-sign-up.usecase';
import { IUserRepository } from '../domain/repositories/user-repository.interface';
import { IAuthService } from '../../auth/infra/firebase/sign-up.service.interface';

@Module({
  imports: [AuthModule],
  providers: [
    {
      provide: UserSignUpUsecase.UseCase,
      useFactory: (
        userRepository: IUserRepository.Repository,
        authService: IAuthService,
      ) => {
        new UserSignUpUsecase.UseCase(userRepository, authService);
      },
      inject: [],
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
