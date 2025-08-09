import { SearchParams } from '../../../../shared/domain/repositories/search-params.repository';
import { UserEntity } from '../../../domain/entities/user-entity';
import { IUserRepository } from '../../../domain/repositories/user-repository.interface';
import { SupabaseService } from '../../../../shared/infra/supabase/supabase.service';
import { UserTable, UserTableMapper } from '../mappers/user-table.mapper';
import { ErrorCodes } from '../../../../shared/domain/enums/error-codes.enum';
import { ConflictError } from '../../../../shared/application/errors/conflict.error';
import { NotFoundError } from '../../../../shared/application/errors/not-found.error';
import { UnauthorizedError } from '../../../../shared/application/errors/unauthorized.error';

export class UserSupabaseRepository implements IUserRepository.Repository {
  sortableFields: string[];
  searchableFields: string[];
  insensitiveFields: string[];
  token?: string;
  table: string = 'users';

  constructor(private supabaseService: SupabaseService) {}
  setToken(token: string): void {
    this.token = token;
  }

  findByEmail(email: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }

  disable(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  search(params: SearchParams): Promise<IUserRepository.SearchOutput> {
    throw new Error('Method not implemented.');
  }

  async insert(entity: UserEntity): Promise<void> {
    if (!this.token)
      throw new UnauthorizedError(ErrorCodes.USER_NOT_AUTHENTICATED);
    const authenticatedClient =
      await this.supabaseService.getAuthenticatedClient(this.token);
    const model = UserTableMapper.toTable(entity);
    try {
      const insert = await authenticatedClient.from(this.table).insert([model]);
      if (insert.error) {
        this.supabaseService.verifyOperationError(insert.error);
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

  async findByToken(token: string): Promise<UserEntity> {
    const authUser = await this.supabaseService.getAuthenticatedClient(token);
    const user = await authUser.auth.getUser();
    if (user.error) this.supabaseService.verifyUserError(user.error);
    const id = user.data.user!.id;
    return await this.findById(id);
  }

  update(entity: UserEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
