import { ApplicationError } from './application.error';

export class ConflictError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }
}
