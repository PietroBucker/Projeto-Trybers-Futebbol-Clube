import { ITeam } from '../Interfaces/ITeam';
import { IModel } from '../Interfaces/IModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

class TeamModel implements IModel<ITeam> {
  private model = SequelizeTeam;

  async getAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }
}

export default TeamModel;
