export interface IModel<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
}
