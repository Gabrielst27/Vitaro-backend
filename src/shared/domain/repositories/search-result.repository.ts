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
  private readonly _items: E[];
  private readonly _total: number;
  private readonly _currentPage: number;
  private readonly _perPage: number;
  private readonly _lastPage: number;
  private readonly _sort?: string | null;
  private readonly _sortDir?: string | null;
  private readonly _queries?: Query[];
  private readonly _dateField?: string | null;
  private readonly _status?: string | null;
  private readonly _from?: Date | null;
  private readonly _to?: Date | null;

  constructor(props: SearchResultProps<E>) {
    this._items = props.items;
    this._total = props.total;
    this._currentPage = props.currentPage;
    this._perPage = props.perPage;
    this._lastPage = Math.floor(this._total / this._perPage);
    this._sort = props.sort ?? null;
    this._sortDir = props.sortDir ?? null;
    this._queries = props.queries ?? [];
    this._dateField = props.dateField ?? null;
    this._status = props.status ?? null;
    this._from = props.from ?? null;
    this._to = props.to ?? null;
  }
}
