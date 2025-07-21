import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserSignUpUsecase } from '../application/usecases/user-sign-up.usecase';
import { UserSignUpDto } from './dtos/user-sign-up.dto';
import { UserSignInWithIdTokenUsecase } from '../application/usecases/user-sign-in-with-id-token.usecase';
import { UserSignInDto } from './dtos/user-sign-in.dto';

@Controller('users')
export class UsersController {
  @Inject(UserSignUpUsecase.UseCase)
  private signUpUseCase: UserSignUpUsecase.UseCase;

  @Inject(UserSignInWithIdTokenUsecase.UseCase)
  private signInUseCase: UserSignInWithIdTokenUsecase.UseCase;

  @Post('sign-up')
  async signUp(@Body() userSignUpDto: UserSignUpDto) {
    return await this.signUpUseCase.execute(userSignUpDto);
  }

  @Post('sign-in')
  async signIn(@Body() userSignInDto: UserSignInDto) {
    return await this.signInUseCase.execute(userSignInDto);
  }
}
