import { INestApplication, ValidationPipe } from '@nestjs/common';
import { BadRequestExceptionFilter } from './shared/infra/exception-filters/bad-request-exception.filter';
import { UnauthorizedExceptionFilter } from './shared/infra/exception-filters/unauthorized-exception.filter';

export function applyGlobalConfig(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(
    new BadRequestExceptionFilter(),
    new UnauthorizedExceptionFilter(),
  );
}
