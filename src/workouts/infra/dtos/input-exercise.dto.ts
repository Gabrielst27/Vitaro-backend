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
import { InputSerieDto } from './input-serie.dto';

export class InputExerciseDto {
  @IsNumberString()
  @Length(4, 4)
  @IsNotEmpty()
  refId: string;

  @IsString()
  @Length(2, 64)
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ArrayMinSize(0)
  @ValidateNested()
  @Type(() => InputSerieDto)
  series: InputSerieDto[];
}
