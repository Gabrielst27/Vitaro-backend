import { Module } from '@nestjs/common';
import { FirebaseAuthService } from './firebase/firebase-auth.service';
import { EnvConfigModule } from '../../shared/infra/env-config/env-config.module';
import { IEnvConfigService } from '../../shared/infra/env-config/env-config.service.interface';
import { EnvConfigService } from '../../shared/infra/env-config/env-config.service';
import { AuthGuard } from './auth.guard';
import { AUTH_SERVICE } from '../application/auth.service.interface';

@Module({
  imports: [EnvConfigModule.forRoot()],
  providers: [
    {
      provide: AUTH_SERVICE,
      useFactory: (envConfigService: IEnvConfigService) => {
        return new FirebaseAuthService(envConfigService);
      },
      inject: [EnvConfigService],
    },
    AuthGuard,
  ],
  exports: [AUTH_SERVICE],
})
export class AuthModule {}
