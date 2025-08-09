import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserSignIn } from '../../application/usecases/user-sign-in';

export class UserSignInDto implements UserSignIn.Input {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
