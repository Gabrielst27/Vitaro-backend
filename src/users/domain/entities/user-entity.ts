import { Entity } from '../../../shared/domain/entities/entity';
import { UserValidatorFactory } from '../validators/user.validator';
import { ERole } from '../../../shared/domain/enums/role.enum';
import { EntityValidationError } from '../../../shared/domain/errors/validation.error';

export type UserProps = {
  id?: string;
  name: string;
  email: string;
  age?: number;
  height?: number;
  weight?: number;
  isActive: boolean;
  role: ERole;
  createdAt?: Date;
  updatedAt?: Date;
  disabledAt?: Date | null;
};

export class UserEntity extends Entity<UserProps> {
  constructor(props: UserProps) {
    UserEntity.validate(props);
    const age = props.age ?? 0;
    const height = props.height ?? 0;
    const id = props.id ?? '';
    const weight = props.weight ?? 0;
    const createdAt = props.createdAt ?? new Date();
    const updatedAt = props.updatedAt ?? new Date();
    const disabledAt = props.disabledAt ?? null;
    super({
      ...props,
      id,
      age,
      height,
      weight,
      createdAt,
      updatedAt,
      disabledAt,
    });
  }

  public get id(): string {
    return this.props.id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get email(): string {
    return this.props.email;
  }

  public get age(): number | undefined {
    return this.props.age;
  }

  public get height(): number | undefined {
    return this.props.height;
  }

  public get weight(): number | undefined {
    return this.props.weight;
  }

  public get isActive(): boolean {
    return this.props.isActive;
  }

  public get role(): ERole {
    return this.props.role;
  }

  public get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  public get disabledAt(): Date | null {
    return this.props.disabledAt;
  }

  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  updateId(id: string) {
    this.props.id = id;
  }

  updateProps(props: UserProps): void {
    UserEntity.validate(props);
    props.updatedAt = new Date();
    super.updateProps(props);
  }
}
