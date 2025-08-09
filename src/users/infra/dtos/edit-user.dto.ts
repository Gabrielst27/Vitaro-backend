import { IsInt, IsNumber, IsOptional, Length, Matches } from 'class-validator';
import { EditUserUseCase } from '../../application/usecases/edit-user.usecase';

export class EitUserDto implements EditUserUseCase.Input {
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
    message:
      'username must contain only alpha characters (except for whitespace)',
  })
  @IsOptional()
  @Length(2, 64)
  name: string;

  @IsInt()
  @IsOptional()
  age?: number;

  @IsNumber()
  @IsOptional()
  height?: number;

  @IsNumber()
  @IsOptional()
  weight?: number;
}
