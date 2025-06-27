import { Entity } from '../../../shared/domain/entities/entity';
import { UserValidatorFactory } from '../validators/user.validator';
import { ERole } from '../../../shared/domain/enums/role.enum';
import { EntityValidationError } from '../../../shared/domain/errors/validation.error';

export type UserProps = {
  name: string;
  email: string;
  password?: string;
  age?: number;
  height?: number;
  weight?: number;
  isActive: boolean;
  role: ERole;
  createdAt?: Date;
  updatedAt?: Date;
  disabledAt?: Date;
};

export class UserEntity extends Entity<UserProps> {
  constructor(props: UserProps, id?: string) {
    UserEntity.validate(props);
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
    this.props.updatedAt = this.props.updatedAt ?? new Date();
  }

  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
