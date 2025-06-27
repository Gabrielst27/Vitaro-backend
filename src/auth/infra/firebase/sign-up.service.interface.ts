import { UserRecord } from 'firebase-admin/auth';

export interface IAuthService {
  createUser(user): Promise<UserRecord>;
}
