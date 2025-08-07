import { Module } from '@nestjs/common';
import { WorkoutsController } from './workouts.controller';
import { WorkoutFirebaseRepository } from './databases/firebase/repositories/workout-firebase.repository';
import { CreateWorkoutUseCase } from '../application/usecases/create-workout.usecase';
import { IWorkoutRepository } from '../domain/repositories/workout.repository.interface';
import { AuthModule } from '../../auth/infra/auth.module';
import { ListUserWorkoutsUseCase } from '../application/usecases/list-user-workouts.usecase';
import { EditWorkoutUseCase } from '../application/usecases/edit-workout.usecase';
import { FirebaseService } from '../../shared/infra/firebase/firebase.service';
import { FirebaseModule } from '../../shared/infra/firebase/firebase.module';
import { SupabaseService } from '../../shared/infra/supabase/supabase.service';
import { WorkoutSupabaseRepository } from './databases/firebase/repositories/workout-supabase.repository';
import { SupabaseModule } from '../../shared/infra/supabase/supabase.module';

@Module({
  imports: [FirebaseModule, AuthModule, SupabaseModule],
  controllers: [WorkoutsController],
  providers: [
    {
      provide: '',
      useFactory: (firebaseService: FirebaseService) => {
        return new WorkoutFirebaseRepository(firebaseService);
      },
      inject: [FirebaseService],
    },
    {
      provide: 'WorkoutRepository',
      useFactory: (supabaseService: SupabaseService) => {
        return new WorkoutSupabaseRepository(supabaseService);
      },
      inject: [SupabaseService],
    },
    {
      provide: CreateWorkoutUseCase.UseCase,
      useFactory: (workoutRepository: IWorkoutRepository.Repository) => {
        return new CreateWorkoutUseCase.UseCase(workoutRepository);
      },
      inject: ['WorkoutRepository'],
    },
    {
      provide: ListUserWorkoutsUseCase.UseCase,
      useFactory: (workoutRepository: IWorkoutRepository.Repository) => {
        return new ListUserWorkoutsUseCase.UseCase(workoutRepository);
      },
      inject: ['WorkoutRepository'],
    },
    {
      provide: EditWorkoutUseCase.UseCase,
      useFactory: (workoutRepository: IWorkoutRepository.Repository) => {
        return new EditWorkoutUseCase.UseCase(workoutRepository);
      },
      inject: ['WorkoutRepository'],
    },
  ],
})
export class WorkoutsModule {}
