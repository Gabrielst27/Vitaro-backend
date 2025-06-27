import { ConflictException, OnModuleInit } from '@nestjs/common';
import { SearchParams } from '../../../../shared/domain/repositories/search-params.repository';
import { FirebaseService } from '../../../../shared/infra/database/firebase/firebase.service';
import { UserEntity } from '../../../domain/entities/user-entity';
import { IUserRepository } from '../../../domain/repositories/user-repository.interface';
import { EFirebaseOperators } from '../../../../shared/domain/enums/firebase-operators.enum';
import { UserDocumentMapper } from '../mappers/user-document.mapper';

export class UserFirebaseRepository implements IUserRepository.Repository {
  sortableFields: string[];
  searchableFields: string[];
  dateFields: string[];

  constructor(private firebaseService: FirebaseService) {}

  search(params: SearchParams): IUserRepository.SearchOutput {
    throw new Error('Method not implemented.');
  }

  async insert(entity: UserEntity): Promise<void> {
    const firestore = await this.firebaseService.getFirestoreDb();
    const document = UserDocumentMapper.toDocument(entity);
    await firestore.collection('users').doc(entity.id).set(document);
  }

  findById(id: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
  update(entity: UserEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }

  async emailExists(email: string): Promise<void> {
    const firestore = await this.firebaseService.getFirestoreDb();
    const snapshot = await firestore
      .collection('users')
      .where('_props.email', EFirebaseOperators.EQUALS, email)
      .limit(1)
      .get();
    if (snapshot.docs.length > 0) {
      throw new ConflictException('This email is already in use');
    }
  }

  disable(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
