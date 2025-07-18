import { Module } from '@nestjs/common';
import { FirebaseAuthService } from './firebase/firebase-auth.service';
import { EnvConfigModule } from '../../shared/infra/env-config/env-config.module';
import { IEnvConfigService } from '../../shared/infra/env-config/env-config.service.interface';
import { EnvConfigService } from '../../shared/infra/env-config/env-config.service';

@Module({
  imports: [EnvConfigModule.forRoot()],
  providers: [
    {
      provide: FirebaseAuthService,
      useFactory: (envConfigService: IEnvConfigService) => {
        return new FirebaseAuthService(envConfigService);
      },
      inject: [EnvConfigService],
    },
  ],
  exports: [FirebaseAuthService],
})
export class AuthModule {}
