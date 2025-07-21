import { IsNotEmpty, IsString } from 'class-validator';
import { UserSignInWithIdTokenUsecase } from '../../application/usecases/user-sign-in-with-id-token.usecase';

export class UserSignInDto implements UserSignInWithIdTokenUsecase.Input {
  @IsString()
  @IsNotEmpty()
  idToken: string;
}
