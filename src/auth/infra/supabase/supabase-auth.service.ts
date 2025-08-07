import {
  AuthenticatedUserOutput,
  AuthenticatedUserOutputMapper,
} from '../../../users/application/outputs/authenticated-user.output';
import { UserEntity } from '../../../users/domain/entities/user-entity';
import { IAuthService } from '../../application/auth.service.interface';
import { ErrorCodes } from '../../../shared/domain/enums/error-codes.enum';
import { SupabaseService } from '../../../shared/infra/supabase/supabase.service';
import { UnauthorizedError } from '../../../shared/application/errors/unauthorized.error';
import { ConflictError } from '../../../shared/application/errors/conflict.error';
import { ForbiddenError } from '../../../shared/application/errors/forbidden.error';

export class SupabaseAuthService implements IAuthService {
  constructor(private service: SupabaseService) {}

  async createUser(
    user: UserEntity,
    password: string,
  ): Promise<AuthenticatedUserOutput> {
    try {
      const credentials = await this.service.client.auth.signUp({
        email: user.email,
        password,
      });
      if (credentials.error) {
        switch (credentials.error.code) {
          case 'user_already_exists':
            throw new ConflictError(ErrorCodes.EMAIL_ALREADY_EXISTS);
          default:
            throw new Error(ErrorCodes.USER_NOT_CREATED);
        }
      }
      if (!credentials.data.session) {
        throw new UnauthorizedError(ErrorCodes.USER_NOT_AUTHENTICATED);
      }
      if (!credentials.data.user) {
        throw new Error(ErrorCodes.USER_NOT_CREATED);
      }
      return AuthenticatedUserOutputMapper.toOutput(
        user,
        credentials.data.session.access_token,
        credentials.data.user.id,
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  signInWithToken(token: any): Promise<{ id: string; token: string }> {
    throw new ForbiddenError(ErrorCodes.FORBIDDEN);
  }

  async signInWithEmail(
    email: string,
    password: string,
  ): Promise<{ id: string; token: string }> {
    const credentials = await this.service.client.auth.signInWithPassword({
      email,
      password,
    });
    if (credentials.error) {
      if (
        credentials.error.code === 'user_not_found' ||
        credentials.error.code === 'invalid_credentials' ||
        credentials.error.code === 'email_address_invalid'
      ) {
        throw new UnauthorizedError(ErrorCodes.INVALID_CREDENTIALS);
      } else if (credentials.error.code === 'user_banned') {
        throw new UnauthorizedError(ErrorCodes.USER_BANNED);
      } else {
        throw new Error(ErrorCodes.UNKNOWN_AUTH_ERROR);
      }
    }
    return {
      id: credentials.data.user.id,
      token: credentials.data.session.access_token,
    };
  }

  async verifyToken(token: string): Promise<any> {
    await this.service.getAuthenticatedClient(token);
    return token;
  }
}
