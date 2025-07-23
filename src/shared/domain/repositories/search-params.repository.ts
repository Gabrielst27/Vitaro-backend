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

export class CustomQuery {
  readonly field: string;
  readonly comparisonOperator: EFirebaseOperators;
  readonly filter: string;

  constructor(props: QueryProps) {
    CustomQuery.validate(props);
    this.field = props.field;
    this.comparisonOperator = props.comparisonOperator;
    this.filter = props.filter;
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
  queries?: CustomQuery[];
};

export class SearchParams {
  readonly page: number;
  readonly perPage: number;
  readonly sortField?: string;
  readonly sortDirection?: SortDirection;
  readonly queries?: CustomQuery[];

  constructor(props: SearchProps) {
    this.page = props.page && props.page >= 0 ? props.page : 0;
    this.perPage = props.perPage && props.perPage > 0 ? props.perPage : 20;
    this.sortField = props.sortField;
    this.sortDirection = props.sortDirection;
    this.queries = props.queries;
  }
}
