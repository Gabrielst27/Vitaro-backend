import { Module } from '@nestjs/common';
import { EnvConfigService } from '../env-config/env-config.service';
import { SupabaseService } from './supabase.service';
import { EnvConfigModule } from '../env-config/env-config.module';

@Module({
  imports: [EnvConfigModule.forRoot()],
  providers: [
    {
      provide: SupabaseService,
      useFactory: (config: EnvConfigService) => {
        return new SupabaseService(config);
      },
      inject: [EnvConfigService],
    },
  ],
  exports: [SupabaseService],
})
export class SupabaseModule {}
