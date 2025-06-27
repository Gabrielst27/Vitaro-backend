import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  @Length(36, 36)
  @IsNotEmpty()
  id: string;

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
