import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AuthModule } from '../../auth/infra/auth.module';
import { UserSignUpUsecase } from '../application/usecases/user-sign-up.usecase';
import { IUserRepository } from '../domain/repositories/user-repository.interface';
import { IAuthService } from '../../auth/application/auth.service.interface';
import { FirebaseModule } from '../../shared/infra/database/firebase/firebase.module';
import { FirebaseService } from '../../shared/infra/database/firebase/firebase.service';
import { UserFirebaseRepository } from './database/repositories/user-firebase.repository';
import { FirebaseAuthService } from '../../auth/infra/firebase/firebase-auth.service';
import { UserSignInUsecase } from '../application/usecases/user-sign-in.usecase';

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
      inject: ['UserRepository', FirebaseAuthService],
    },
    {
      provide: UserSignInUsecase.UseCase,
      useFactory: (
        userRepository: IUserRepository.Repository,
        authService: IAuthService,
      ) => {
        return new UserSignInUsecase.UseCase(userRepository, authService);
      },
      inject: ['UserRepository', FirebaseAuthService],
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
