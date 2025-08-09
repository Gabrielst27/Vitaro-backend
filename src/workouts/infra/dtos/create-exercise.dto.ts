import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumberString,
  Length,
  ValidateNested,
} from 'class-validator';
import { CreateSerieDto } from './create-serie.dto';

export class CreateExerciseDto {
  @IsNumberString()
  @Length(4, 4)
  @IsNotEmpty()
  refId: string;

  @IsArray()
  @ArrayMinSize(0)
  @ValidateNested()
  @Type(() => CreateSerieDto)
  series: CreateSerieDto[];
}
