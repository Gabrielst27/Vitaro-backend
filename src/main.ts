import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { credential } from 'firebase-admin';

initializeApp();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const db = getFirestore();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
