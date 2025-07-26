import { getAuth } from 'firebase-admin/auth';
import { IAuthService } from '../../application/auth.service.interface';
import {
  AuthenticatedUserOutput,
  AuthenticatedUserOutputMapper,
} from '../../../users/application/outputs/authenticated-user.output';
import { UserEntity } from '../../../users/domain/entities/user-entity';
import { UnauthorizedException } from '@nestjs/common';
import { ErrorCodes } from '../../../shared/domain/enums/error-codes.enum';

export class FirebaseAuthService implements IAuthService {
  async createUser(
    user: UserEntity,
    password: string,
  ): Promise<AuthenticatedUserOutput> {
    try {
      const authUser = await getAuth().createUser({
        uid: user.id,
        email: user.email,
        password: password,
        displayName: user.name,
      });
      if (!authUser) {
        throw new Error('Firebase signUp failed');
      }
      const customToken = await getAuth().createCustomToken(user.id);
      const userOutput = AuthenticatedUserOutputMapper.toOutput(
        user,
        customToken,
      );
      return userOutput;
    } catch {
      throw new Error('Firebase signUp failed');
    }
  }

  async signInFirebase(token: string): Promise<string> {
    try {
      const decodedToken = await this.verifyToken(token);
      return decodedToken.user_id;
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
