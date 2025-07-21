import { AuthenticatedUserOutput } from '../../users/application/outputs/authenticated-user.output';
import { UserEntity } from '../../users/domain/entities/user-entity';

export const AUTH_SERVICE = Symbol('AUTH_SERVICE');

export interface IAuthService {
  createUser(user: UserEntity): Promise<AuthenticatedUserOutput>;
  signInFirebase(token: string): Promise<string>;
  verifyToken(token: string): Promise<any>;
}
