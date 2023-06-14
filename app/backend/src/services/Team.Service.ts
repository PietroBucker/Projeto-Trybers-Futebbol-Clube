import { IModel } from '../Interfaces/IModel';
import { ITeam } from '../Interfaces/ITeam';
import { ServiceResponse } from '../Interfaces/ServiceRespose';
import TeamModel from '../models/Team.Model';

class TeamService {
  constructor(
    private teamModel: IModel<ITeam> = new TeamModel(),
  ) {}

  async findAll(): Promise<ServiceResponse<ITeam[]>> {
    const modelResponse = await this.teamModel.findAll();
    return { status: 200, data: modelResponse };
  }

  async findById(id: ITeam['id']): Promise<ServiceResponse<ITeam>> {
    const modelResponse = await this.teamModel.findById(id);
    if (modelResponse === null) {
      return { status: 404, data: { message: 'not found' } };
    }
    return { status: 200, data: modelResponse };
  }
}

export default TeamService;
