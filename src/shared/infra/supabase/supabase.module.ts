import { DynamicModule, Module } from '@nestjs/common';
import { SupabaseModule as DefaultSupabaseModule } from 'nestjs-supabase-js';
import { EnvConfigModule } from '../env-config/env-config.module';
import { EnvConfigService } from '../env-config/env-config.service';

@Module({})
export class SupabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: SupabaseModule,
      imports: [
        EnvConfigModule.forRoot(),
        DefaultSupabaseModule.forRootAsync({
          imports: [EnvConfigModule.forRoot()],
          inject: [EnvConfigService],
          useFactory: (envConfigService: EnvConfigService) => ({
            supabaseUrl: envConfigService.getSupabaseUrl(),
            supabaseKey: envConfigService.getSupabaseApiKey(),
          }),
        }),
      ],
    };
  }
}
