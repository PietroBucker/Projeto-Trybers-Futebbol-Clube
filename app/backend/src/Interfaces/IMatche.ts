export interface IMatche {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface IMatcheWithName extends IMatche {
  homeTeam: { teamName: string };
  awayTeam: { teamName: string };
}
