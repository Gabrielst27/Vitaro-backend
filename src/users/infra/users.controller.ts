import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserSignUpUsecase } from '../application/usecases/user-sign-up.usecase';
import { UserSignUpDto } from './dtos/user-sign-up.dto';
import { UserSignInWithIdTokenUsecase } from '../application/usecases/user-sign-in-with-id-token.usecase';
import { UserSignInDto } from './dtos/user-sign-in.dto';
import { AuthGuard } from '../../auth/infra/auth.guard';
import { CurrentUser } from '../../shared/infra/decorators/current-user/current-user.decorator';
import { FindCurrentUserUseCase } from '../application/usecases/find-current-user.usecase';
import { EditUserUseCase } from '../application/usecases/edit-user.usecase';

@Controller('users')
export class UsersController {
  @Inject(UserSignUpUsecase.UseCase)
  private signUpUseCase: UserSignUpUsecase.UseCase;

  @Inject(UserSignInWithIdTokenUsecase.UseCase)
  private signInUseCase: UserSignInWithIdTokenUsecase.UseCase;

  @Inject(FindCurrentUserUseCase.UseCase)
  private findCurrentUserUseCase: FindCurrentUserUseCase.UseCase;

  @Inject(EditUserUseCase.UseCase)
  private editUserUseCase: EditUserUseCase.UseCase;

  @Post('sign-up')
  async signUp(@Body() userSignUpDto: UserSignUpDto) {
    return await this.signUpUseCase.execute(userSignUpDto);
  }

  @Post('sign-in')
  async signIn(@Body() userSignInDto: UserSignInDto) {
    return await this.signInUseCase.execute(userSignInDto);
  }

  @Get('find-current-user')
  @UseGuards(AuthGuard)
  async findCurrentUser(@CurrentUser() userId: string) {
    return await this.findCurrentUserUseCase.execute({}, userId);
  }

  @Put('edit')
  @UseGuards(AuthGuard)
  async editUser(@Body() editUserDto: any, @CurrentUser() userId: string) {
    return await this.editUserUseCase.execute(editUserDto, userId);
  }
}
