import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvConfigService } from './shared/infra/env-config/env-config.service';
import { initializeApp, cert } from 'firebase-admin/app';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(EnvConfigService);
  try {
    const firebaseCredentialsPath = configService.getFirebaseCredentialPath();
    if (!initializeApp.length) {
      initializeApp({
        credential: cert(firebaseCredentialsPath),
      });
    }
    console.log('Firebase Admin SDK inicializado com sucesso');
  } catch (error) {
    console.error('Erro ao inicializar o Firebase Admin SDK:', error);
    process.exit(1);
  }
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(configService.getPort());
}
bootstrap();
