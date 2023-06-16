import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatcheModel, ResolvesTeamGoals } from '../Interfaces/IModel';
import { IMatche } from '../Interfaces/IMatche';
import SequelizeMatche from '../database/models/SequelizeMatche';

class MatchesModel implements IMatcheModel<IMatche> {
  private model = SequelizeMatche;

  async findAll(): Promise<IMatche[]> {
    const dbData = await this.model.findAll(
      { include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ] },
    );
    return dbData;
  }

  async findAllInProgress(inProgress: boolean): Promise<IMatche[]> {
    const dbData = await this.model.findAll(
      { where: { inProgress },
        include: [
          { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
          { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
        ] },
    );
    return dbData;
  }

  async findById(id: number): Promise<IMatche | null> {
    const dbData = await this.model.findOne({ where: { id } });
    if (dbData === null) {
      return null;
    }
    return dbData;
  }

  async finishingUpdate(id: number): Promise<{ message: string } | null> {
    const [affectedCount] = await this.model.update({ inProgress: true }, { where: { id } });

    if (affectedCount === 0) {
      return null;
    }
    return { message: 'Finished' };
  }

  async updateMatches(id: number, body: ResolvesTeamGoals): Promise<ResolvesTeamGoals | null> {
    const { homeTeamGoals, awayTeamGoals } = body;
    const [affectedCount] = await this.model
      .update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    if (affectedCount === 0) {
      return null;
    }
    return body;
  }

  async createMatches(body: IMatche): Promise<IMatche | null> {
    const dbData = await this.model.create(body);
    console.log(dbData);
    if (!dbData) {
      return null;
    }
    return dbData;
  }
}

export default MatchesModel;
