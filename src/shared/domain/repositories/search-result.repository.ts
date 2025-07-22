import { Entity } from '../entities/entity';
import { Query } from './search-params.repository';

export type SearchResultProps<E extends Entity> = {
  items: E[];
  total: number;
  currentPage: number;
  perPage: number;
  sort?: string | null;
  sortDir?: string | null;
  queries?: Query[];
  dateField?: string | null;
  status?: string | null;
  from?: Date | null;
  to?: Date | null;
};

export class SearchResult<E extends Entity> {
  readonly items: E[];
  readonly total: number;
  readonly currentPage: number;
  readonly perPage: number;
  readonly lastPage: number;
  readonly sort?: string | null;
  readonly sortDir?: string | null;
  readonly queries?: Query[];
  readonly dateField?: string | null;
  readonly status?: string | null;
  readonly from?: Date | null;
  readonly to?: Date | null;

  constructor(props: SearchResultProps<E>) {
    this.items = props.items;
    this.total = props.total;
    this.currentPage = props.currentPage;
    this.perPage = props.perPage;
    this.lastPage = Math.floor(this.total / this.perPage);
    this.sort = props.sort ?? null;
    this.sortDir = props.sortDir ?? null;
    this.queries = props.queries ?? [];
    this.dateField = props.dateField ?? null;
    this.status = props.status ?? null;
    this.from = props.from ?? null;
    this.to = props.to ?? null;
  }
}
