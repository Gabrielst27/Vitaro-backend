import { Module } from '@nestjs/common';
import { EnvConfigModule } from './env-config/env-config.module';
import { FirebaseModule } from './database/firebase/firebase.module';

@Module({
  imports: [EnvConfigModule.forRoot(), FirebaseModule],
  exports: [FirebaseModule],
})
export class SharedModule {}
