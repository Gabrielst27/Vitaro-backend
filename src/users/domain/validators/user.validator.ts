import { ClassValidator } from '../../../shared/domain/validators/class.validator';
import { UserProps } from '../entities/user-entity';
import { UserRules } from './user-rules.validator';

export class UserValidator extends ClassValidator<UserRules> {
  validate(props: UserProps): boolean {
    return super.validate(new UserRules(props ?? ({} as UserProps)));
  }
}

export class UserValidatorFactory {
  static create(): UserValidator {
    return new UserValidator();
  }
}
