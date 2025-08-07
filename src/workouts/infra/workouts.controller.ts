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
import { CreateWorkoutDto } from './dtos/create-workout.dto';
import { AuthGuard } from '../../auth/infra/auth.guard';
import { ListUserWorkoutsUseCase } from '../application/usecases/list-user-workouts.usecase';
import { SearchParamsDto } from '../../shared/infra/dtos/search-params.dto';
import { EditWorkoutUseCase } from '../application/usecases/edit-workout.usecase';
import { EditWorkoutDto } from './dtos/edit-workout.dto';
import { Token } from '../../shared/infra/decorators/token/token.decorator';

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
    @Body() createWorkoutDto: CreateWorkoutDto,
    @Token() token,
  ) {
    return this.createWorkoutUseCase.execute(createWorkoutDto, token);
  }

  @Get('users/:id/user-workouts')
  async listUserWorkouts(
    @Param('id') userId: string,
    @Query() searchParams: SearchParamsDto,
  ) {
    return this.listUserWorkoutsUseCase.execute({ ...searchParams, userId });
  }

  @Put('edit-workout')
  async editWorkout(
    @Token() token: string,
    @Body() editWorkoutDto: EditWorkoutDto,
  ) {
    return this.editWorkoutUseCase.execute(editWorkoutDto, token);
  }
}
