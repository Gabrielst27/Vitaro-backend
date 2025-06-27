import { Module } from '@nestjs/common';
import { SignUpService } from './firebase/sign-up.service';

@Module({
  providers: [SignUpService],
  exports: [SignUpService],
})
export class AuthModule {}
