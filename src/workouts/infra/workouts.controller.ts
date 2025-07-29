import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateWorkoutUseCase } from '../application/usecases/create-workout.usecase';
import { InputWorkoutDto } from './dtos/input-workout.dto';
import { AuthGuard } from '../../auth/infra/auth.guard';
import { CurrentUser } from '../../shared/infra/decorators/current-user/current-user.decorator';
import { ListUserWorkoutsUseCase } from '../application/usecases/list-user-workouts.usecase';
import { SearchParamsDto } from '../../shared/infra/dtos/search-params.dto';
import { EditWorkoutUseCase } from '../application/usecases/edit-workout.usecase';

@Controller('workouts')
@UseGuards(AuthGuard)
export class WorkoutsController {
  @Inject(CreateWorkoutUseCase.UseCase)
  private createWorkoutUseCase: CreateWorkoutUseCase.UseCase;

  @Inject(ListUserWorkoutsUseCase.UseCase)
  private listUserWorkoutsUseCase: ListUserWorkoutsUseCase.UseCase;

  @Inject(EditWorkoutUseCase.UseCase)
  private editWorkoutUseCase: EditWorkoutUseCase.UseCase;

  @Post('create-workout')
  async createWorkout(
    @Body() createWorkoutDto: InputWorkoutDto,
    @CurrentUser() userId: string,
  ) {
    return this.createWorkoutUseCase.execute(createWorkoutDto, userId);
  }

  @Get('/users/:id/user-workouts')
  async listUserWorkouts(
    @Param('id') userId: string,
    @Query() searchParams: SearchParamsDto,
  ) {
    return this.listUserWorkoutsUseCase.execute({ ...searchParams, userId });
  }

  @Put(':id/edit-workout')
  async editWorkout(
    @Param('id') id: string,
    @CurrentUser() userId: string,
    @Body() editWorkoutDto: InputWorkoutDto,
  ) {
    return this.editWorkoutUseCase.execute({ ...editWorkoutDto, id }, userId);
  }
}
