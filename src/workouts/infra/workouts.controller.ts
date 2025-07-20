import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateWorkoutUseCase } from '../application/usecases/create-workout.usecase';
import { CreateWorkoutDto } from './dtos/create-workout.dto';

@Controller('workouts')
export class WorkoutsController {
  @Inject(CreateWorkoutUseCase.UseCase)
  createWorkoutUseCase: CreateWorkoutUseCase.UseCase;

  @Post('create-workout')
  async createWorkout(@Body() createWorkoutDto: CreateWorkoutDto) {
    return this.createWorkoutUseCase.execute(createWorkoutDto);
  }
}
