import { DynamicModule, Module } from '@nestjs/common';
import { EnvConfigService } from './env-config.service';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { join } from 'node:path';

@Module({})
export class EnvConfigModule {
  static forRoot(options: ConfigModuleOptions = {}): DynamicModule {
    return {
      module: EnvConfigModule,
      imports: [
        ConfigModule.forRoot({
          ...options,
          envFilePath: join(process.cwd(), `.env.${process.env.ENV}`),
          isGlobal: true,
        }),
      ],
      providers: [EnvConfigService],
      exports: [EnvConfigService],
    };
  }
}
