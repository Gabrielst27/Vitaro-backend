import { validateSync } from 'class-validator';
import { FieldsErrors, IClassValidator } from './class.validator.interface';

export abstract class ClassValidator<Rules> implements IClassValidator<Rules> {
  errors: FieldsErrors;
  validate(rules: any): boolean {
    const errors = validateSync(rules);
    if (errors.length > 0) {
      this.errors = {};
      for (const error of errors) {
        const field = error.property;
        this.errors[field] = error.constraints
          ? Object.values(error.constraints)
          : [];
      }
    }
    return !errors.length;
  }
}
