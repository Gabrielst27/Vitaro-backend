import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  createUser(user: UserEntity): Promise<void>;
}
