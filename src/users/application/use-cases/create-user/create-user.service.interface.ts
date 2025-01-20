import { CreateUserDto } from 'src/users/presentation/dtos/create-user.dto';

export interface ICreateUserService {
  execute(userDto: CreateUserDto): Promise<void>;
}
