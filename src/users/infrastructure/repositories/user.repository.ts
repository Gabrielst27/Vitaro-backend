import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';
import { UserEntity } from '../../domain/entities/user.entity';
import { IUserRepository } from 'src/users/domain/repositories-interfaces/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  public async createUser(user: UserEntity): Promise<void> {
    const plainUser = user.toPlainObject();
    await getFirestore().collection('users').add(plainUser);
  }
}
