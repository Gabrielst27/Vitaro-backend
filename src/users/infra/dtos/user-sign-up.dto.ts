import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { UserSignUpUsecase } from '../../application/usecases/user-sign-up.usecase';

export class UserSignUpDto implements UserSignUpUsecase.Input {
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
    message:
      'username must contain only alpha characters (except for whitespace)',
  })
  @IsNotEmpty()
  @Length(2, 64)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(12, 64)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 64)
  password: string;
}
