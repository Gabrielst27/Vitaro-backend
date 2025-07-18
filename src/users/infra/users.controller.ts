import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserSignUpUsecase } from '../application/usecases/user-sign-up.usecase';
import { UserSignUpDto } from './dtos/user-sign-up.dto';
import { UserSignInUsecase } from '../application/usecases/user-sign-in.usecase';

@Controller('users')
export class UsersController {
  @Inject(UserSignUpUsecase.UseCase)
  private signUpUseCase: UserSignUpUsecase.UseCase;

  @Inject(UserSignInUsecase.UseCase)
  private signInUseCase: UserSignInUsecase.UseCase;

  @Post('sign-up')
  async signUp(@Body() userSignUpDto: UserSignUpDto) {
    return await this.signUpUseCase.execute(userSignUpDto);
  }

  @Post('sign-in')
  async signIn(@Body() userSignInDto: any) {
    return await this.signInUseCase.execute(userSignInDto);
  }
}
