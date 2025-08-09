import { ApplicationError } from './application.error';

export class BadRequestError extends ApplicationError {
  constructor(public message: string) {
    super(message);
    this.name = 'BadRequestError';
  }
}
