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
}
