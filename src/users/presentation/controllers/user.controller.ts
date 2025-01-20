import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ICreateUserService } from 'src/users/application/use-cases/create-user/create-user.service.interface';

@Controller('users')
export class UserController {
  constructor(
    @Inject('ICreateUserService')
    private readonly createUserService: ICreateUserService,
  ) {}

  @Post('create')
  async createUser(@Body() body) {
    await this.createUserService.execute(body);
  }
}
