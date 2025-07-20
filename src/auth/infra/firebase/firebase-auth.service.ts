import { getAuth } from 'firebase-admin/auth';
import { IAuthService } from '../../application/auth.service.interface';
import {
  AuthenticatedUserOutput,
  AuthenticatedUserOutputMapper,
} from '../../../users/application/outputs/authenticated-user.output';
import { UserEntity } from '../../../users/domain/entities/user-entity';
import axios, { AxiosResponse } from 'axios';
import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { UserIdentity } from '../../application/outputs/user-identity.output';
import { GoogleApiIdentityDto } from './dtos/google-api-identity.dto';
import { IEnvConfigService } from '../../../shared/infra/env-config/env-config.service.interface';

export class FirebaseAuthService implements IAuthService {
  constructor(private envConfigService: IEnvConfigService) {}

  async createUser(user: UserEntity): Promise<AuthenticatedUserOutput> {
    try {
      const authUser = await getAuth().createUser({
        uid: user.id,
        email: user.props.email,
        password: user.props.password,
        displayName: user.props.name,
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

  async signInFirebase(email: string, password: string): Promise<UserIdentity> {
    try {
      const response = await axios.post(
        `${this.envConfigService.getGoogleApiIdentityToolkit()}/accounts:signInWithPassword?email=${email}&password=${password}&key=${this.envConfigService.getFirebaseApiKey()}`,
        {},
        { timeout: 16000 },
      );
      if (response.status >= 400) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const userResponse: GoogleApiIdentityDto = response.data;
      if (!userResponse.registered) {
        throw new ForbiddenException('User is not registered');
      }
      return {
        uid: userResponse.localId,
        token: userResponse.idToken,
      };
    } catch (error) {
      if (error.response.status >= 400 && error.response.status <= 500) {
        throw new UnauthorizedException('Invalid credentials');
      }
      throw new Error('ERR-0001');
    }
  }
}
