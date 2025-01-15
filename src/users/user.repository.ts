import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private users = [];

  public async listUsers() {
    return this.users;
  }

  public async createUser(user) {
    this.users.push(user);
  }
}
