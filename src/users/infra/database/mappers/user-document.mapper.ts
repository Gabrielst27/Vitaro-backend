import { Timestamp } from 'firebase-admin/firestore';
import { ERole } from '../../../../shared/domain/enums/role.enum';
import { UserEntity } from '../../../domain/entities/user-entity';

export type UserDocument = {
  name: string;
  email: string;
  age: number;
  height: number;
  weight: number;
  isActive: boolean;
  role: ERole;
  createdAt: Date;
  updatedAt: Date;
  disabledAt?: Date | null;
};

export class UserDocumentMapper {
  static toDocument(entity: UserEntity): UserDocument {
    return entity.toJSON();
  }

  static toEntity(props: UserDocument, id: string): UserEntity {
    const createdAt: Date =
      UserDocumentMapper.convertDate(props.createdAt) || new Date();
    const updatedAt: Date =
      UserDocumentMapper.convertDate(props.updatedAt) || new Date();
    const disabledAt: Date | undefined = UserDocumentMapper.convertDate(
      props.disabledAt,
    );
    const height: number = Number(props.height);
    const weight: number = Number(props.height);
    return new UserEntity(
      { ...props, createdAt, updatedAt, disabledAt, height, weight },
      id,
    );
  }

  private static convertDate(value: any): Date | undefined {
    if (!value) return undefined;
    if (value instanceof Date) return value;
    if (value instanceof Timestamp) return value.toDate();
    return new Date(value);
  }
}
