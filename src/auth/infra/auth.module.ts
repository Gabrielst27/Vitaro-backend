import { Module } from '@nestjs/common';
import { AuthService } from './firebase/sign-up.service';

@Module({
  providers: [
    {
      provide: 'IAuthService',
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
