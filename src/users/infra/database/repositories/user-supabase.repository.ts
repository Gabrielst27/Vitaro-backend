import { SearchParams } from '../../../../shared/domain/repositories/search-params.repository';
import { UserEntity } from '../../../domain/entities/user-entity';
import { IUserRepository } from '../../../domain/repositories/user-repository.interface';
import { SupabaseService } from '../../../../shared/infra/supabase/supabase.service';
import { UserTable, UserTableMapper } from '../mappers/user-table.mapper';
import { ErrorCodes } from '../../../../shared/domain/enums/error-codes.enum';
import { ConflictError } from '../../../../shared/infra/erros/conflict.error';
import { NotFoundError } from '../../../../shared/application/errors/not-found.error';

export class UserSupabaseRepository implements IUserRepository.Repository {
  sortableFields: string[];
  searchableFields: string[];
  insensitiveFields: string[];
  table: string = 'users';

  constructor(private supabaseService: SupabaseService) {}

  findByEmail(email: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }

  async emailExists(email: string): Promise<void> {
    const result = await this.supabaseService.client
      .from(this.table)
      .select('*')
      .eq('email', email);
    if (result.data) {
      throw new ConflictError(ErrorCodes.EMAIL_ALREADY_EXISTS);
    }
  }

  disable(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  search(params: SearchParams): Promise<IUserRepository.SearchOutput> {
    throw new Error('Method not implemented.');
  }

  async insert(entity: UserEntity): Promise<void> {
    const authenticatedClient =
      await this.supabaseService.getAuthenticatedClient();
    const model = UserTableMapper.toTable(entity);
    try {
      const insert = await authenticatedClient.from(this.table).insert([model]);
      if (insert.error) {
        switch (insert.error.code) {
          case '42501':
            throw Error(ErrorCodes.INSUFFICIENT_PRIVILEGE);
          case '23502':
            throw Error(ErrorCodes.NOT_NULL_VIOLATION);
          default:
            throw Error();
        }
      }
    } catch (error) {
      throw new Error('ERR-0002');
    }
  }

  async findById(id: string): Promise<UserEntity> {
    const result = await this.supabaseService.client
      .from(this.table)
      .select('*')
      .eq('id', id);
    if (result.error || !result.data) {
      throw new NotFoundError(ErrorCodes.USER_NOT_FOUND);
    }
    return UserTableMapper.toEntity(result.data[0] as UserTable);
  }
  update(entity: UserEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
