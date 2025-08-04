import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AuthModule } from '../../auth/infra/auth.module';
import { UserSignUpUsecase } from '../application/usecases/user-sign-up.usecase';
import { IUserRepository } from '../domain/repositories/user-repository.interface';
import {
  AUTH_SERVICE,
  IAuthService,
} from '../../auth/application/auth.service.interface';
import { UserFirebaseRepository } from './database/repositories/user-firebase.repository';
import { UserSignInWithIdTokenUsecase } from '../application/usecases/user-sign-in-with-id-token.usecase';
import { FindCurrentUserUseCase } from '../application/usecases/find-current-user.usecase';
import { EditUserUseCase } from '../application/usecases/edit-user.usecase';
import { FirebaseModule } from '../../shared/infra/firebase/firebase.module';
import { FirebaseService } from '../../shared/infra/firebase/firebase.service';

@Module({
  imports: [AuthModule, FirebaseModule],
  providers: [
    {
      provide: 'UserRepository',
      useFactory: (firebaseService: FirebaseService) => {
        return new UserFirebaseRepository(firebaseService);
      },
      inject: [FirebaseService],
    },
    {
      provide: UserSignUpUsecase.UseCase,
      useFactory: (
        userRepository: IUserRepository.Repository,
        authService: IAuthService,
      ) => {
        return new UserSignUpUsecase.UseCase(userRepository, authService);
      },
      inject: ['UserRepository', AUTH_SERVICE],
    },
    {
      provide: UserSignInWithIdTokenUsecase.UseCase,
      useFactory: (
        userRepository: IUserRepository.Repository,
        authService: IAuthService,
      ) => {
        return new UserSignInWithIdTokenUsecase.UseCase(
          userRepository,
          authService,
        );
      },
      inject: ['UserRepository', AUTH_SERVICE],
    },
    {
      provide: FindCurrentUserUseCase.UseCase,
      useFactory: (userRepository: IUserRepository.Repository) => {
        return new FindCurrentUserUseCase.UseCase(userRepository);
      },
      inject: ['UserRepository'],
    },
    {
      provide: EditUserUseCase.UseCase,
      useFactory: (userRepository: IUserRepository.Repository) => {
        return new EditUserUseCase.UseCase(userRepository);
      },
      inject: ['UserRepository'],
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
