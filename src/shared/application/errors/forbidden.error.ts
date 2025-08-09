import { ApplicationError } from './application.error';

export class ForbiddenError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';
  }
}
