import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { EnvConfigModule } from '../env-config/env-config.module';

@Module({
  imports: [EnvConfigModule.forRoot()],
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
