import { Injectable, Inject } from '@nestjs/common';
import { ICreateUserService } from './create-user.service.interface';
import { CreateUserDto } from 'src/users/presentation/dtos/create-user.dto';
import { UserEntity } from 'src/users/domain/entities/user.entity';
import { IUserRepository } from 'src/users/domain/repositories-interfaces/user.repository.interface';

@Injectable()
export class CreateUserService implements ICreateUserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(userDto: CreateUserDto): Promise<void> {
    const user = new UserEntity({
      name: userDto.name,
      email: userDto.email,
      password: userDto.password,
      age: userDto.age || null,
      weight: userDto.weight || null,
    });

    await this.userRepository.createUser(user);
  }
}
