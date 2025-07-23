import {
  IsAlpha,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { SortDirection } from '../../domain/repositories/search-params.repository';

export class SearchParamsDto {
  @IsInt()
  @IsOptional()
  page?: number;

  @IsInt()
  @IsOptional()
  perPage?: number;

  @IsString()
  @IsOptional()
  sortField?: string;

  @IsAlpha()
  @Length(3, 4)
  @IsOptional()
  sortDirection?: SortDirection;
}
