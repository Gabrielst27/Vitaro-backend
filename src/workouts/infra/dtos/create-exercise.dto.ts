import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { SerieRules } from '../../domain/validators/serie.rules';
import { CreateSerieDto } from './create-serie.dto';

export class CreateExerciseDto {
  @IsNumberString()
  @Length(4, 4)
  @IsNotEmpty()
  refId: string;

  @IsString()
  @Length(2, 64)
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ValidateNested()
  @Type(() => CreateSerieDto)
  series: CreateSerieDto[];
}
