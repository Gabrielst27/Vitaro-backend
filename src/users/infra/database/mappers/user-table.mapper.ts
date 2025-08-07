import { ErrorCodes } from '../../../../shared/domain/enums/error-codes.enum';
import { ERole } from '../../../../shared/domain/enums/role.enum';
import { ValidationError } from '../../../../shared/domain/errors/validation.error';
import { UserEntity, UserProps } from '../../../domain/entities/user-entity';

export type UserTable = {
  id: string;
  name: string;
  email: string;
  age: number | null;
  weight: number | null;
  height: number | null;
  is_active: boolean;
  role: ERole;
  created_at: Date;
  updated_at: Date;
  disabled_at: Date | null;
};

export class UserTableMapper {
  static toTable(entity: UserEntity): UserTable {
    if (!entity.id) {
      throw new ValidationError(ErrorCodes.INVALID_ENTITY);
    }
    const props = entity.toJSON();
    return {
      id: props.id,
      name: props.name,
      email: props.email,
      age: props.age,
      weight: props.weight,
      height: props.height,
      is_active: props.isActive,
      role: props.role,
      created_at: props.createdAt,
      updated_at: props.updatedAt,
      disabled_at: props.disabledAt,
    };
  }

  static toEntity(model: UserTable): UserEntity {
    const { is_active, created_at, updated_at, disabled_at, ...cleanProps } =
      model;
    const props: UserProps = {
      ...cleanProps,
      age: model.age ?? undefined,
      weight: model.weight ?? undefined,
      height: model.height ?? undefined,
      isActive: model.is_active,
      createdAt: new Date(model.created_at),
      updatedAt: new Date(model.updated_at),
      disabledAt: model.disabled_at ? new Date(model.disabled_at) : undefined,
    };
    return new UserEntity(props);
  }
}
