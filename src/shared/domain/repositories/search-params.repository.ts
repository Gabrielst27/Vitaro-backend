import { EFirebaseOperators } from '../enums/firebase-operators.enum';
import {
  EntityValidationError,
  ValidationError,
} from '../errors/validation.error';

export type SortDirection = 'asc' | 'desc';

export type QueryProps = {
  field: string;
  comparisonOperator: EFirebaseOperators;
  filter: string;
};

export class Query {
  private readonly _field: string;
  private readonly _comparisonOperator: EFirebaseOperators;
  private readonly _filter: string;

  constructor(props: QueryProps) {
    Query.validate(props);
    this._field = props.field;
    this._comparisonOperator = props.comparisonOperator;
    this._filter = props.filter;
  }

  static validate(props: QueryProps) {
    if (!props.field || !props.comparisonOperator || !props.filter) {
      throw new ValidationError('Invalid data');
    }
  }
}

export type SearchProps = {
  page?: number;
  perPage?: number;
  sortField?: string;
  sortDirection?: SortDirection;
  queries?: Query[];
  dateField?: string;
  from?: Date;
  to?: Date;
};

export class SearchParams {
  private readonly _page: number;
  private readonly _perPage: number;
  private readonly _sortField?: string;
  private readonly _sortDirection?: SortDirection;
  private readonly _queries?: Query[];
  private readonly _dateField?: string;
  private readonly _from?: Date;
  private readonly _to?: Date;

  constructor(props: SearchProps) {
    this._page = props.page && props.page >= 0 ? props.page : 0;
    this._perPage = props.perPage && props.perPage > 0 ? props.perPage : 20;
    this._sortField = props.sortField;
    this._sortDirection = props.sortDirection;
    this._queries = props.queries;
    this._dateField = props.dateField;
    this._from = props.from;
    this._to = props.to;
  }
}
