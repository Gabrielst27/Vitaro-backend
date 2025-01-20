import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './controllers/user.controller';

@Module({
  controllers: [UserController],
  providers: [UserRepository],
})
export class UserModule {}
