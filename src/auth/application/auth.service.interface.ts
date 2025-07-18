import { AuthenticatedUserOutput } from '../../users/application/dtos/authenticated-user.output.dto';
import { UserEntity } from '../../users/domain/entities/user-entity';
import { UserIdentity } from './outputs/user-identity.output';

export interface IAuthService {
  createUser(user: UserEntity): Promise<AuthenticatedUserOutput>;
  signInFirebase(email: string, password: string): Promise<UserIdentity>;
}
