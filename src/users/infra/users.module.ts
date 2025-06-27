import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AuthModule } from '../../auth/infra/auth.module';
import { UserSignUpUsecase } from '../application/usecases/user-sign-up.usecase';
import { IUserRepository } from '../domain/repositories/user-repository.interface';
import { IAuthService } from '../../auth/infra/firebase/sign-up.service.interface';
import { FirebaseModule } from '../../shared/infra/database/firebase/firebase.module';
import { FirebaseService } from '../../shared/infra/database/firebase/firebase.service';
import { UserFirebaseRepository } from './database/repositories/user-firebase.repository';
import { SignUpService } from '../../auth/infra/firebase/sign-up.service';

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
      inject: ['UserRepository', SignUpService],
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
