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
  createdAt?: Date;
  updatedAt?: Date;
  disabledAt?: Date;
};

export class UserDocumentMapper {
  static toDocument(entity: UserEntity): UserDocument {
    const document = {
      ...entity.props,
      age: entity.props.age ?? 0,
      height: entity.props.height ?? 0,
      weight: entity.props.weight ?? 0,
    };
    delete document.password;
    return document;
  }

  static toEntity(props: UserDocument, id: string): UserEntity {
    const createdAt: Date | undefined = UserDocumentMapper.convertDate(
      props.createdAt,
    );
    const updatedAt: Date | undefined = UserDocumentMapper.convertDate(
      props.updatedAt,
    );
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
