import { Entity } from '../../domain/entities/entity';
import { SearchResult } from '../../domain/repositories/search-result.repository';

export type PaginationOutput<Output = any> = {
  items: Output[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};

export class PaginationOutputMapper {
  static toOutput<Output = any>(
    items: Output[],
    result: SearchResult<Entity>,
  ): PaginationOutput<Output> {
    return {
      items,
      total: result.total,
      currentPage: result.currentPage,
      lastPage: result.lastPage,
      perPage: result.perPage,
    };
  }
}
