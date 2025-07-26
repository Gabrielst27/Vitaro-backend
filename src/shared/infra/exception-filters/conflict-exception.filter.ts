import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ConflictError } from '../erros/conflict.error';

@Catch(ConflictError)
export class ConflictExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    response.status(409).json({
      statusCode: 409,
      timestamp: new Date().toISOString(),
      error: 'Conflict',
      message: exception.message,
    });
  }
}
