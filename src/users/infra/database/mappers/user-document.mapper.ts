import { ERole } from '../../../../shared/domain/enums/role.enum';
import { UserEntity } from '../../../domain/entities/user-entity';

export type UserDocument = {
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
};

export class UserDocumentMapper {
  static toDocument(entity: UserEntity): UserDocument {
    const document = {
      ...entity.props,
    };
    delete document.password;
    return document;
  }
}
