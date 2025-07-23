import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateWorkoutUseCase } from '../application/usecases/create-workout.usecase';
import { CreateWorkoutDto } from './dtos/create-workout.dto';
import { AuthGuard } from '../../auth/infra/auth.guard';
import { CurrentUser } from '../../shared/infra/decorators/current-user/current-user.decorator';
import { ListUserWorkoutsUseCase } from '../application/usecases/list-user-workouts.usecase';
import { SearchParamsDto } from '../../shared/infra/dtos/search-params.dto';

@Controller('workouts')
@UseGuards(AuthGuard)
export class WorkoutsController {
  @Inject(CreateWorkoutUseCase.UseCase)
  createWorkoutUseCase: CreateWorkoutUseCase.UseCase;

  @Inject(ListUserWorkoutsUseCase.UseCase)
  listUserWorkoutsUseCase: ListUserWorkoutsUseCase.UseCase;

  @Post('create-workout')
  async createWorkout(
    @Body() createWorkoutDto: CreateWorkoutDto,
    @CurrentUser() userId: string,
  ) {
    return this.createWorkoutUseCase.execute(createWorkoutDto, userId);
  }

  @Get(':id/user-workouts')
  async listUserWorkouts(
    @Param('id') userId: string,
    @Query() searchParams: SearchParamsDto,
  ) {
    return this.listUserWorkoutsUseCase.execute({ ...searchParams, userId });
  }
}
