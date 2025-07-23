import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BadRequestError } from '../../application/errors/bad-request.error';

@Catch(BadRequestError)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    response.status(400).json({
      statusCode: 400,
      timestamp: new Date().toISOString(),
      error: 'Bad Request',
      message: exception.message,
    });
  }
}
