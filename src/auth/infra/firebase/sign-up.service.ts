import { getAuth, UserRecord } from 'firebase-admin/auth';
import { IAuthService } from './sign-up.service.interface';
import { SignUpDto } from './sign-up.dtos';

export class SignUpService implements IAuthService {
  async createUser(user: SignUpDto): Promise<UserRecord> {
    try {
      return await getAuth().createUser({
        uid: user.id,
        email: user.email,
        password: user.password,
        displayName: user.name,
      });
    } catch {
      throw new Error('Firebase signup failed');
    }
  }
}
