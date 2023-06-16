export interface IModel<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
}

export interface IUserModel<T> {
  findByEmail(email: string): Promise<T | null>;
}

export type ResolvesTeamGoals = {
  homeTeamGoals: number,
  awayTeamGoals: number,
};

export interface IMatcheModel<T> extends IModel<T> {
  findAllInProgress(inProgress: boolean): Promise<T[]>;
  finishingUpdate(id: number): Promise<{ message: string } | null>
  updateMatches(id: number, body: ResolvesTeamGoals): Promise< ResolvesTeamGoals | null>
  createMatches(body: T): Promise<T | null>;
}
