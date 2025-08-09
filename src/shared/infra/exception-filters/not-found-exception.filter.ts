import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { NotFoundError } from '../../application/errors/not-found.error';

@Catch(NotFoundError)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    response.status(404).json({
      statusCode: 404,
      timestamp: new Date().toISOString(),
      error: 'NotFoundException',
      message: exception.message,
    });
  }
}
