import { UserEntity } from '../../domain/entities/user-entity';
import { ERole } from '../../../shared/domain/enums/role.enum';

export type UserOutput = {
  id: string;
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

export class UserOutputMapper {
  static toOutput(entity: UserEntity): UserOutput {
    return {
      id: entity.id,
      ...entity.props,
    };
  }
}
