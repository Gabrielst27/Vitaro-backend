import { getAuth } from 'firebase-admin/auth';
import { IAuthService } from '../../application/auth.service.interface';
import {
  AuthenticatedUserOutput,
  AuthenticatedUserOutputMapper,
} from '../../../users/application/outputs/authenticated-user.output';
import { UserEntity } from '../../../users/domain/entities/user-entity';
import { UnauthorizedException } from '@nestjs/common';
import { ErrorCodes } from '../../../shared/domain/enums/error-codes.enum';
import { UnauthorizedError } from '../../../shared/application/errors/unauthorized.error';

export class FirebaseAuthService implements IAuthService {
  async createUser(
    user: UserEntity,
    password: string,
  ): Promise<AuthenticatedUserOutput> {
    try {
      const authUser = await getAuth().createUser({
        email: user.email,
        password: password,
        displayName: user.name,
      });
      if (!authUser) {
        throw new Error('Firebase signUp failed');
      }
      const customToken = await getAuth().createCustomToken(authUser.uid);
      const userOutput = AuthenticatedUserOutputMapper.toOutput(
        user,
        customToken,
        authUser.uid,
      );
      return userOutput;
    } catch {
      throw new Error('Firebase signUp failed');
    }
  }

  signInWithEmail(
    email: any,
    password: any,
  ): Promise<{ id: string; token: string }> {
    throw new UnauthorizedError(ErrorCodes.FORBIDDEN);
  }

  async signInWithToken(token: string): Promise<{ id: string; token: string }> {
    const auth = getAuth();
    try {
      const decodedToken = await this.verifyToken(token);
      return {
        id: decodedToken.user_id,
        token: decodedToken,
      };
    } catch (error) {
      if (error.response.status >= 400 && error.response.status <= 500) {
        throw new UnauthorizedException(ErrorCodes.INVALID_CREDENTIALS);
      }
      throw new Error('ERR-0001');
    }
  }

  async verifyToken(token: string): Promise<any> {
    const decodedToken = await getAuth().verifyIdToken(token);
    return decodedToken;
  }
}
