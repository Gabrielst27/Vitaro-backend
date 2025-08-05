import { AuthenticatedUserOutput } from '../../users/application/outputs/authenticated-user.output';
import { UserEntity } from '../../users/domain/entities/user-entity';

export const AUTH_SERVICE = Symbol('AUTH_SERVICE');

export interface IAuthService {
  createUser(
    user: UserEntity,
    password: string,
  ): Promise<AuthenticatedUserOutput>;
  signIn(email, password): Promise<{ id: string; token: string }>;
  verifyToken(token: string): Promise<any>;
}
