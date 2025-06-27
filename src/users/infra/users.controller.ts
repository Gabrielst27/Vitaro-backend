import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserSignUpUsecase } from '../application/usecases/user-sign-up.usecase';
import { UserSignUpDto } from './dtos/user-sign-up.dto';

@Controller('users')
export class UsersController {
  @Inject(UserSignUpUsecase.UseCase)
  private signUpUseCase: UserSignUpUsecase.UseCase;

  @Post('sign-up')
  async signUp(@Body() userSignUpDto: UserSignUpDto) {
    return await this.signUpUseCase.execute(userSignUpDto);
  }
}
