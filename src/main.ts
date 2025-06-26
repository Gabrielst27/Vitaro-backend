import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvConfigService } from './shared/infra/env-config/env-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(app.get<EnvConfigService>(EnvConfigService).getPort());
}
bootstrap();
