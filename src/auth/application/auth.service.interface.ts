import { AuthenticatedUserOutput } from '../../users/application/outputs/authenticated-user.output';
import { UserEntity } from '../../users/domain/entities/user-entity';
import { UserIdentity } from './outputs/user-identity.output';

export interface IAuthService {
  createUser(user: UserEntity): Promise<AuthenticatedUserOutput>;
  signInFirebase(email: string, password: string): Promise<UserIdentity>;
}
