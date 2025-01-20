import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { CreateUserService } from './application/use-cases/create-user/create-user.service';
import { UserRepository } from './infrastructure/repositories/user.repository';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: 'ICreateUserService',
      useClass: CreateUserService,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
