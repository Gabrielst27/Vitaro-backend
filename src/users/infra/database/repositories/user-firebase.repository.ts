import { ConflictException } from '@nestjs/common';
import { SearchParams } from '../../../../shared/domain/repositories/search-params.repository';
import { UserEntity } from '../../../domain/entities/user-entity';
import { IUserRepository } from '../../../domain/repositories/user-repository.interface';
import { EFirebaseOperators } from '../../../../shared/domain/enums/firebase-operators.enum';
import {
  UserDocument,
  UserDocumentMapper,
} from '../mappers/user-document.mapper';
import { ErrorCodes } from '../../../../shared/domain/enums/error-codes.enum';
import { NotFoundError } from '../../../../shared/application/errors/not-found.error';
import { FirebaseService } from '../../../../shared/infra/firebase/firebase.service';

export class UserFirebaseRepository implements IUserRepository.Repository {
  sortableFields: string[] = [
    'name',
    'email',
    'age',
    'height',
    'weight',
    'createdAt',
  ];
  searchableFields: string[] = [
    'name',
    'email',
    'age',
    'height',
    'weight',
    'createdAt',
    'updatedAt',
    'disabledAt',
  ];
  insensitiveFields: string[] = ['name', 'email'];
  collection: string = 'users';

  constructor(private firebaseService: FirebaseService) {}

  search(params: SearchParams): Promise<IUserRepository.SearchOutput> {
    throw new Error('Method not implemented.');
  }

  async insert(entity: UserEntity): Promise<void> {
    const firestore = await this.firebaseService.getFirestoreDb();
    const document = UserDocumentMapper.toDocument(entity);
    await firestore.collection(this.collection).add(document);
  }

  async findById(id: string): Promise<UserEntity> {
    const firestore = await this.firebaseService.getFirestoreDb();
    const snapshot = await firestore.collection(this.collection).doc(id).get();
    const data = snapshot.data();
    if (!data) {
      throw new NotFoundError(ErrorCodes.USER_NOT_FOUND);
    }
    return UserDocumentMapper.toEntity(data as UserDocument, id);
  }

  async update(entity: UserEntity): Promise<void> {
    const firestore = await this.firebaseService.getFirestoreDb();
    const document = UserDocumentMapper.toDocument(entity);
    if (!entity.id) {
      throw new NotFoundError(ErrorCodes.USER_NOT_FOUND);
    }
    try {
      await firestore
        .collection(this.collection)
        .doc(entity.id)
        .update(document);
    } catch {
      throw new NotFoundError(ErrorCodes.USER_NOT_FOUND);
    }
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.1');
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
      throw new ConflictException(ErrorCodes.EMAIL_ALREADY_EXISTS);
    }
  }

  disable(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
