import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { UnauthorizedError } from '../../application/errors/unauthorized.error';

@Catch(UnauthorizedError)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    response.status(401).json({
      statusCode: 401,
      timestamp: new Date().toISOString(),
      error: 'Unauthorized',
      message: exception.message,
    });
  }
}
