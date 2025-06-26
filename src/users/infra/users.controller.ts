import { Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post('sign-up')
  signUp(userSignUpDto: any) {}
}
