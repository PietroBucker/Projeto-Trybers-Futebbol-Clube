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

  async finishingUpdate(id: number): Promise<{ message: string } | null> {
    const [affectedCount] = await this.model.update({ inProgress: false }, { where: { id } });
    console.log(affectedCount);

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

  async createMatches(body: IMatche): Promise<IMatche | string> {
    try {
      const dbData = await this.model.create({ ...body, inProgress: true });
      return dbData;
    } catch (error) {
      const { name } = error as Error;
      if (name === 'SequelizeForeignKeyConstraintError') {
        return 'There is no team with such id!';
      }
      return 'create Error';
    }
  }
}

export default MatchesModel;
