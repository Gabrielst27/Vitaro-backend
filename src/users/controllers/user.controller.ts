import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';

@Controller('users')
export class UserController {
  constructor(private readonly usersRepository: UserRepository) {}

  @Post('create')
  async createUser(@Body() body) {
    await this.usersRepository.createUser(body);
    return body;
  }
}
