export interface IModel<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
}

export interface IUserModel<T> {
  findByEmail(email: string): Promise<T | null>;
}
