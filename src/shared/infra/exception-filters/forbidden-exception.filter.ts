import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ForbiddenError } from '../../application/errors/forbidden.error';

@Catch(ForbiddenError)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    response.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      error: 'Forbidden',
      message: exception.message,
    });
  }
}
