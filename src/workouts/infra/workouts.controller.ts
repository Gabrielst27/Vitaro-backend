import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { CreateWorkoutUseCase } from '../application/usecases/create-workout.usecase';
import { CreateWorkoutDto } from './dtos/create-workout.dto';
import { AuthGuard } from '../../auth/infra/auth.guard';

@Controller('workouts')
@UseGuards(AuthGuard)
export class WorkoutsController {
  @Inject(CreateWorkoutUseCase.UseCase)
  createWorkoutUseCase: CreateWorkoutUseCase.UseCase;

  @Post('create-workout')
  async createWorkout(@Body() createWorkoutDto: CreateWorkoutDto) {
    return this.createWorkoutUseCase.execute(createWorkoutDto);
  }
}
