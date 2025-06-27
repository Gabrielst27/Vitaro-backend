import { Entity } from '../entities/entity';

export interface IRepository<E extends Entity> {
  insert(entity: E): Promise<void>;
  findById(id: string): Promise<E>;
  update(entity: E): Promise<void>;
  delete(id: string): Promise<void>;
}
