import { ITeam } from '../Interfaces/ITeam';
import { IModel } from '../Interfaces/IModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

class TeamModel implements IModel<ITeam> {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const dbData = await this.model.findOne({ where: { id } });
    if (dbData === null) {
      return null;
    }
    return dbData;
  }
}

export default TeamModel;
