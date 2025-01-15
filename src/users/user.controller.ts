import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Controller('users')
export class UserController {
  constructor(private readonly usersRepository: UserRepository) {}

  @Get()
  async listUsers() {
    return this.usersRepository.listUsers();
  }

  @Post('create')
  async createUser(@Body() body) {
    this.usersRepository.createUser(body);
    return body;
  }
}
