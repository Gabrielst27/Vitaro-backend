import { UserRecord } from 'firebase-admin/auth';
import { SignUpDto } from './sign-up.dtos';

export interface IAuthService {
  createUser(user: SignUpDto): Promise<{ user: UserRecord; token: string }>;
}
