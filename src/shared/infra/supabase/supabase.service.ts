import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { IEnvConfigService } from '../env-config/env-config.service.interface';
import { ErrorCodes } from '../../domain/enums/error-codes.enum';
import { ValidationError } from '../../domain/errors/validation.error';
import { UnauthorizedError } from '../../application/errors/unauthorized.error';

export class SupabaseService {
  public client: SupabaseClient;

  constructor(private configService: IEnvConfigService) {
    this.client = createClient(
      configService.getSupabaseUrl(),
      configService.getSupabaseApiKey(),
    );
  }

  async getAuthenticatedClient(token: string): Promise<SupabaseClient> {
    return createClient(
      this.configService.getSupabaseUrl(),
      this.configService.getSupabaseApiKey(),
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
    );
  }

  verifyUserError(error): void {
    if (error.code === 'bad_jwt') {
      throw new UnauthorizedError(ErrorCodes.INVALID_TOKEN);
    }
    throw new UnauthorizedError(ErrorCodes.USER_NOT_AUTHENTICATED);
  }

  verifyOperationError(error): void {
    switch (error.code) {
      case '42501':
        throw new ValidationError(ErrorCodes.INSUFFICIENT_PRIVILEGE);
      case '23502':
        throw new ValidationError(ErrorCodes.NOT_NULL_VIOLATION);
      case '23503':
        throw new ValidationError(ErrorCodes.FOREIGN_KEY_VIOLATION);
      default:
        throw new ValidationError(
          ErrorCodes.UNKNOWN_RLS_ERROR + ' - ' + error.message,
        );
    }
  }
}
