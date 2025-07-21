import { Injectable } from '@nestjs/common';
import { IEnvConfigService } from './env-config.service.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService implements IEnvConfigService {
  constructor(private configService: ConfigService) {}

  getPort(): number {
    return Number(this.configService.get<number>('PORT'));
  }

  getEnv(): string {
    const env = this.configService.get<string>('ENV') ?? 'test';
    return env;
  }

  getFirebaseCredentialPath(): string {
    const path =
      this.configService.get<string>('FIREBASE_CREDENTIALS_PATH') ?? '';
    return path;
  }

  getFirebaseApiKey(): string {
    const key = this.configService.get<string>('FIREBASE_API_KEY') ?? '';
    return key;
  }

  getGoogleApiIdentityToolkit(): string {
    const url =
      this.configService.get<string>('GOOGLE_API_IDENTITY_TOOLKIT') ?? '';
    return url;
  }

  getJwTSecret(): string {
    return this.configService.get<string>('JWT_SECRET')!;
  }

  getJwtExpiresInSecond(): number {
    return Number(this.configService.get<number>('JWT_EXPIRES_IN_SECONDS')!);
  }
}
