import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumberString,
  Length,
  ValidateNested,
} from 'class-validator';
import { EditSerieDto } from './edit-serie.dto';

export class EditExerciseDto {
  @IsNumberString()
  @Length(4, 4)
  @IsNotEmpty()
  refId: string;

  @IsArray()
  @ArrayMinSize(0)
  @ValidateNested()
  @Type(() => EditSerieDto)
  series: EditSerieDto[];
}
