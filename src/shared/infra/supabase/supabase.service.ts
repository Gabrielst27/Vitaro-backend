import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { IEnvConfigService } from '../env-config/env-config.service.interface';
import { UnauthorizedError } from '../../application/errors/unauthorized.error';
import { ErrorCodes } from '../../domain/enums/error-codes.enum';

export class SupabaseService {
  public client: SupabaseClient;

  constructor(private configService: IEnvConfigService) {
    this.client = createClient(
      configService.getSupabaseUrl(),
      configService.getSupabaseApiKey(),
    );
  }

  async getAuthenticatedClient(): Promise<SupabaseClient> {
    const user = await this.client.auth.getSession();
    if (!user.data.session) {
      throw new UnauthorizedError(ErrorCodes.USER_NOT_AUTHENTICATED);
    }
    return createClient(
      this.configService.getSupabaseUrl(),
      this.configService.getSupabaseApiKey(),
      {
        global: {
          headers: {
            Authorization: `Bearer ${user.data.session.access_token}`,
          },
        },
      },
    );
  }
}
