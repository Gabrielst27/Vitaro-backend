import { Entity } from '../entities/entity';
import { IRepository } from './repository.interface';
import { SearchParams } from './search-params.repository';
import { SearchResult } from './search-result.repository';

export interface ISearchableRepository<
  E extends Entity,
  SearchInput = SearchParams,
  SearchOutput = SearchResult<E>,
> extends IRepository<E> {
  sortableFields: string[];
  searchableFields: string[];
  dateFields: string[];

  search(params: SearchInput): SearchOutput;
}
