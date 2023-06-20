import { ServiceResponse } from '../Interfaces/ServiceRespose';
import { IMatche, IMatcheWithName } from '../Interfaces/IMatche';
import { IMatcheModel } from '../Interfaces/IModel';
import MatchesModel from '../models/Matches.Model';
import { ILeaderBoard } from '../Interfaces/ILeaderBoard';

type HomeOrAway = 'home' | 'away';
type Bouth = 'bouth';

class LeaderBoardService {
  static home: ILeaderBoard[];
  static away: ILeaderBoard[];
  static bouth: ILeaderBoard[];
  constructor(
    private matchModel: IMatcheModel<IMatche> = new MatchesModel(),
  ) {
  }

  static resetArr() {
    LeaderBoardService.home = [];
    LeaderBoardService.away = [];
    LeaderBoardService.bouth = [];
  }

  async findAllHome(inProgress: boolean): Promise<ServiceResponse<ILeaderBoard[]>> {
    const modelResponse = await this.matchModel.findAllInProgress(inProgress);
    LeaderBoardService.home = modelResponse
      .map((el) => LeaderBoardService.leaderBoardGenerate(el, 'home'));
    LeaderBoardService.agroup('home');

    return { status: 200, data: LeaderBoardService.home };
  }

  async findAllAway(inProgress: boolean): Promise<ServiceResponse<ILeaderBoard[]>> {
    const modelResponse = await this.matchModel.findAllInProgress(inProgress);
    LeaderBoardService.away = modelResponse
      .map((el) => LeaderBoardService.leaderBoardGenerate(el, 'away'));

    LeaderBoardService.agroup('away');

    return { status: 200, data: LeaderBoardService.away };
  }

  async findAll(inProgress: boolean): Promise<ServiceResponse<ILeaderBoard[]>> {
    const modelResponse = await this.matchModel.findAllInProgress(inProgress);
    LeaderBoardService.resetArr();
    modelResponse.forEach((el) => {
      LeaderBoardService.away.push(LeaderBoardService.leaderBoardGenerate(el, 'away'));
      LeaderBoardService.home.push(LeaderBoardService.leaderBoardGenerate(el, 'home'));
    });
    LeaderBoardService.bouth = [...LeaderBoardService.away, ...LeaderBoardService.home];
    LeaderBoardService.agroup('bouth');

    return { status: 200, data: LeaderBoardService.bouth };
  }

  static leaderBoardGenerate(el: IMatcheWithName | IMatche, homeORaway: HomeOrAway): ILeaderBoard {
    const totalPoints = LeaderBoardService
      .totalPoint(el.homeTeamGoals, el.awayTeamGoals, homeORaway);
    const adv = homeORaway === 'home' ? 'away' : 'home';
    return {
      name: (el as IMatcheWithName)[`${homeORaway}Team`].teamName,
      totalPoints,
      totalGames: 1,
      totalVictories: totalPoints === 3 ? 1 : 0,
      totalDraws: totalPoints === 1 ? 1 : 0,
      totalLosses: totalPoints === 0 ? 1 : 0,
      goalsFavor: el[`${homeORaway}TeamGoals`],
      goalsOwn: el[`${adv}TeamGoals`],
      goalsBalance: el[`${homeORaway}TeamGoals`] - el[`${adv}TeamGoals`],
      efficiency: (totalPoints / (1 * 3)) * 100,
    };
  }

  static totalPoint(home: number, away: number, homeORaway: string): number {
    if (home === away) {
      return 1;
    }
    if (homeORaway === 'home' && home > away) {
      return 3;
    }
    if (homeORaway === 'away' && home < away) {
      return 3;
    }
    return 0;
  }

  static agroup(homeORaway: HomeOrAway | Bouth): void {
    const result = this[homeORaway].reduce((acc: ILeaderBoard[], obj) => {
      const isExist = acc.find((item) => item.name === obj.name);
      if (isExist) {
        isExist.totalPoints += obj.totalPoints;
        isExist.totalGames += obj.totalGames;
        isExist.totalVictories += obj.totalVictories;
        isExist.totalDraws += obj.totalDraws;
        isExist.totalLosses += obj.totalLosses;
        isExist.goalsFavor += obj.goalsFavor;
        isExist.goalsOwn += obj.goalsOwn;
        isExist.goalsBalance += obj.goalsBalance;
        isExist.efficiency = Number(isExist.efficiency) + Number(obj.efficiency);
      } else { acc.push(obj); }
      return acc;
    }, []);
    LeaderBoardService[homeORaway] = result;
    LeaderBoardService.efficiencityAverage(homeORaway);
    LeaderBoardService.order(homeORaway);
  }

  static order(homeORaway: HomeOrAway | Bouth) {
    LeaderBoardService[homeORaway]
      .sort((a:ILeaderBoard, b:ILeaderBoard) => (
        (b.totalPoints - a.totalPoints)
        || (b.goalsBalance - a.goalsBalance)
        || (b.goalsFavor - a.goalsFavor)
        || (b.goalsBalance - a.goalsBalance)
        || (Number(b.efficiency) - Number(a.efficiency))
      ));
  }

  static efficiencityAverage(homeORaway: HomeOrAway | Bouth): void {
    const result = LeaderBoardService[homeORaway]
      .map((el) => ({
        ...el,
        efficiency: (Number(el.efficiency) / el.totalGames).toFixed(2),
      }));
    LeaderBoardService[homeORaway] = result;
  }
}

export default LeaderBoardService;
