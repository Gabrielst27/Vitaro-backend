import { Entity } from '../entities/entity';

export interface IRepository<E extends Entity> {
  token?: string;
  setToken(token: string): void;
  insert(entity: E): Promise<void>;
  findById(id: string): Promise<E>;
  update(entity: E): Promise<void>;
  delete(id: string): Promise<void>;
}
