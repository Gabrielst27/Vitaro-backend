import { Module } from '@nestjs/common';
import { EnvConfigModule } from '../../shared/infra/env-config/env-config.module';
import { AuthGuard } from './auth.guard';
import { AUTH_SERVICE } from '../application/auth.service.interface';
import { SupabaseAuthService } from './supabase/supabase-auth.service';
import { SupabaseModule } from '../../shared/infra/supabase/supabase.module';
import { SupabaseService } from '../../shared/infra/supabase/supabase.service';

@Module({
  imports: [EnvConfigModule, SupabaseModule],
  providers: [
    {
      provide: AUTH_SERVICE,
      useFactory: (service: SupabaseService) => {
        return new SupabaseAuthService(service);
      },
      inject: [SupabaseService],
    },
    AuthGuard,
  ],
  exports: [AUTH_SERVICE],
})
export class AuthModule {}
