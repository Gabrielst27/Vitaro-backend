import { ErrorCodes } from '../../../../shared/domain/enums/error-codes.enum';
import { ERole } from '../../../../shared/domain/enums/role.enum';
import { ValidationError } from '../../../../shared/domain/errors/validation.error';
import { UserEntity } from '../../../domain/entities/user-entity';

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
      email: props.name,
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
}
