import {
  ConflictException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { SearchParams } from '../../../../shared/domain/repositories/search-params.repository';
import { FirebaseService } from '../../../../shared/infra/database/firebase/firebase.service';
import { UserEntity } from '../../../domain/entities/user-entity';
import { IUserRepository } from '../../../domain/repositories/user-repository.interface';
import { EFirebaseOperators } from '../../../../shared/domain/enums/firebase-operators.enum';
import {
  UserDocument,
  UserDocumentMapper,
} from '../mappers/user-document.mapper';

export class UserFirebaseRepository implements IUserRepository.Repository {
  sortableFields: string[];
  searchableFields: string[];
  insensitiveFields: string[];
  collection: string = 'users';

  constructor(private firebaseService: FirebaseService) {}

  search(params: SearchParams): Promise<IUserRepository.SearchOutput> {
    throw new Error('Method not implemented.');
  }

  async insert(entity: UserEntity): Promise<void> {
    const firestore = await this.firebaseService.getFirestoreDb();
    const document = UserDocumentMapper.toDocument(entity);
    await firestore.collection(this.collection).doc(entity.id).set(document);
  }

  async findById(id: string): Promise<UserEntity> {
    const firestore = await this.firebaseService.getFirestoreDb();
    const snapshot = await firestore.collection(this.collection).doc(id).get();
    const data = snapshot.data();
    if (!data) {
      throw new NotFoundException('User not found');
    }
    return UserDocumentMapper.toEntity(data as UserDocument, id);
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
      .collection(this.collection)
      .where('email', EFirebaseOperators.EQUALS, email)
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
