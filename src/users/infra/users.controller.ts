import { Controller, Inject, Post } from '@nestjs/common';
import { UserSignUpUsecase } from '../application/usecases/user-sign-up.usecase';

@Controller('users')
export class UsersController {
  @Inject(UserSignUpUsecase.UseCase)
  private signUpUseCase: UserSignUpUsecase.UseCase;

  @Post('sign-up')
  async signUp(userSignUpDto: any) {
    return await this.signUpUseCase.execute(userSignUpDto);
  }
}
