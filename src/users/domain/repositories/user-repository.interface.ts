import { SearchParams } from '../../../shared/domain/repositories/search-params.repository';
import { SearchResult } from '../../../shared/domain/repositories/search-result.repository';
import { ISearchableRepository } from '../../../shared/domain/repositories/searchable.repository.interface';
import { UserEntity } from '../entities/user-entity';

export namespace IUserRepository {
  export type SearchInput = SearchParams;
  export type SearchOutput = SearchResult<UserEntity>;

  export interface Repository
    extends ISearchableRepository<UserEntity, SearchInput, SearchOutput> {
    findByToken(token: string): Promise<UserEntity>;
    findByEmail(email: string): Promise<UserEntity>;
    disable(id: string): Promise<void>;
  }
}
