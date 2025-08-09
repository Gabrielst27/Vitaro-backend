import { FieldsErrors } from '../validators/class.validator.interface';
import { DomainError } from './domain.error';

export class ValidationError extends DomainError {}

export class EntityValidationError extends DomainError {
  constructor(public error: FieldsErrors) {
    super('Entity Validation Error');
    this.name = 'EntityValidationError';
  }
}
