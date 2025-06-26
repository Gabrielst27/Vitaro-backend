import { Entity } from '../../../shared/domain/entities/entity';

export type UserProps = {
  name: string;
  email: string;
  password: string;
  age?: number;
  height?: number;
  weight?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  disabledAt: Date;
};

export class UserEntity extends Entity<UserProps> {
  constructor(props: UserProps, id?: string) {
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
    this.props.updatedAt = this.props.updatedAt ?? new Date();
  }
}
