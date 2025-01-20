export class UserEntity {
  name: string;
  email: string;
  password: string;
  age: number | null = null;
  weight: number | null = null;

  constructor(user: Partial<UserEntity>) {
    Object.assign(this, user);
  }

  toPlainObject(): Record<string, any> {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      age: this.age,
      weight: this.weight,
    };
  }
}
