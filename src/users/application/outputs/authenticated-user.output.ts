import { UserEntity } from '../../domain/entities/user-entity';
import { ERole } from '../../../shared/domain/enums/role.enum';

export type AuthenticatedUserOutput = {
  id: string;
  name: string;
  email: string;
  age?: number;
  height?: number;
  weight?: number;
  isActive: boolean;
  role: ERole;
  createdAt?: Date;
  updatedAt?: Date;
  disabledAt?: Date;
  token: string;
};

export class AuthenticatedUserOutputMapper {
  static toOutput(entity: UserEntity, token: string): AuthenticatedUserOutput {
    return {
      id: entity.id,
      ...entity.props,
      token,
    };
  }
}
