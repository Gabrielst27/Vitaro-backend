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
import { SupabaseModule } from '../../shared/infra/supabase/supabase.module';
import { UserSupabaseRepository } from './database/repositories/user-supabase.repository';
import { SupabaseService } from '../../shared/infra/supabase/supabase.service';

@Module({
  imports: [AuthModule, FirebaseModule, SupabaseModule],
  providers: [
    {
      provide: '',
      useFactory: (firebaseService: FirebaseService) => {
        return new UserFirebaseRepository(firebaseService);
      },
      inject: [FirebaseService],
    },
    {
      provide: 'UserRepository',
      useFactory: (supabaseService: SupabaseService) => {
        return new UserSupabaseRepository(supabaseService);
      },
      inject: [SupabaseService],
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
