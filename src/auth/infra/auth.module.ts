import { Module } from '@nestjs/common';
import { FirebaseAuthService } from './firebase/firebase-auth.service';
import { EnvConfigModule } from '../../shared/infra/env-config/env-config.module';
import { AuthGuard } from './auth.guard';
import { AUTH_SERVICE } from '../application/auth.service.interface';

@Module({
  imports: [EnvConfigModule.forRoot()],
  providers: [
    {
      provide: AUTH_SERVICE,
      useClass: FirebaseAuthService,
    },
    AuthGuard,
  ],
  exports: [AUTH_SERVICE],
})
export class AuthModule {}
