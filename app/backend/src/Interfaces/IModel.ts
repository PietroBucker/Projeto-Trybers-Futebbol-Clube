export interface IModel<T> {
  getAll(): Promise<T[]>;
}
