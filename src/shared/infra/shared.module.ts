import { Module } from '@nestjs/common';
import { EnvConfigModule } from './env-config/env-config.module';

@Module({
  imports: [EnvConfigModule.forRoot()],
})
export class SharedModule {}
