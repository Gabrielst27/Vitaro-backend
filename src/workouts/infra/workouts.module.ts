import { Module } from '@nestjs/common';
import { WorkoutsController } from './workouts.controller';
import { FirebaseModule } from '../../shared/infra/database/firebase/firebase.module';
import { WorkoutFirebaseRepository } from './databases/firebase/repositories/workout-firebase.repository';
import { FirebaseService } from '../../shared/infra/database/firebase/firebase.service';
import { CreateWorkoutUseCase } from '../application/usecases/create-workout.usecase';
import { IWorkoutRepository } from '../domain/repositories/workout.repository.interface';

@Module({
  imports: [FirebaseModule],
  controllers: [WorkoutsController],
  providers: [
    {
      provide: 'WorkoutRepository',
      useFactory: (firebaseService: FirebaseService) => {
        return new WorkoutFirebaseRepository(firebaseService);
      },
      inject: [FirebaseService],
    },
    {
      provide: CreateWorkoutUseCase.UseCase,
      useFactory: (workoutRepository: IWorkoutRepository.Repository) => {
        return new CreateWorkoutUseCase.UseCase(workoutRepository);
      },
      inject: ['WorkoutRepository'],
    },
  ],
})
export class WorkoutsModule {}
