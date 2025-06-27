import { getAuth, UserRecord } from 'firebase-admin/auth';
import { IAuthService } from './sign-up.service.interface';

export class AuthService implements IAuthService {
  async createUser(user: any): Promise<UserRecord> {
    return await getAuth().createUser({
      email: user.email,
      password: user.password,
      displayName: user.name,
    });
  }
}
