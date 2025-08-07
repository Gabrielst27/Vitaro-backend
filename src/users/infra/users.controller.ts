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
import { UserSignIn } from '../application/usecases/user-sign-in';
import { UserSignInDto } from './dtos/user-sign-in.dto';
import { AuthGuard } from '../../auth/infra/auth.guard';
import { FindCurrentUserUseCase } from '../application/usecases/find-current-user.usecase';
import { EditUserUseCase } from '../application/usecases/edit-user.usecase';
import { Token } from '../../shared/infra/decorators/token/token.decorator';

@Controller('users')
export class UsersController {
  @Inject(UserSignUpUsecase.UseCase)
  private signUpUseCase: UserSignUpUsecase.UseCase;

  @Inject(UserSignIn.UseCase)
  private signInUseCase: UserSignIn.UseCase;

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
  async findCurrentUser(@Token() token: string) {
    return await this.findCurrentUserUseCase.execute({}, token);
  }

  @Put('edit')
  @UseGuards(AuthGuard)
  async editUser(@Body() editUserDto: any, @Token() token: string) {
    return await this.editUserUseCase.execute(editUserDto, token);
  }
}
