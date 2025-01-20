import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  public async createUser(user: UserEntity) {
    await getFirestore().collection('users').add(user);
  }
}
