import { IMatche } from '../Interfaces/IMatche';
import { IMatcheModel, ResolvesTeamGoals } from '../Interfaces/IModel';
import { ServiceResponse } from '../Interfaces/ServiceRespose';
import MatchesModel from '../models/Matches.Model';

class MatchesService {
  constructor(
    private matchesModel: IMatcheModel<IMatche> = new MatchesModel(),
  ) {}

  async findAll(): Promise<ServiceResponse<IMatche[]>> {
    const modelResponse = await this.matchesModel.findAll();
    return { status: 200, data: modelResponse };
  }

  async findAllInProgress(inProgress: boolean): Promise<ServiceResponse<IMatche[]>> {
    const modelResponse = await this.matchesModel.findAllInProgress(inProgress);
    return { status: 200, data: modelResponse };
  }

  async findById(id: IMatche['id']): Promise<ServiceResponse<IMatche>> {
    const modelResponse = await this.matchesModel.findById(id);
    if (modelResponse === null) {
      return { status: 404, data: { message: 'not found' } };
    }
    return { status: 200, data: modelResponse };
  }

  async finishingUpdate(id: number): Promise<ServiceResponse<{ message: string }>> {
    const modelResponse = await this.matchesModel
      .finishingUpdate(id);

    if (modelResponse === null) {
      return { status: 404, data: { message: 'not found' } };
    }
    return { status: 200, data: modelResponse };
  }

  async updateMatches(
    id: number,
    body: ResolvesTeamGoals,
  ): Promise<ServiceResponse<ResolvesTeamGoals>> {
    const modelResponse = await this.matchesModel.updateMatches(id, body);
    if (modelResponse === null) {
      return { status: 404, data: { message: 'not found' } };
    }
    return { status: 200, data: modelResponse };
  }

  async createMatches(body: IMatche): Promise<ServiceResponse<ResolvesTeamGoals>> {
    const modelResponse = await this.matchesModel.createMatches(body);
    if (modelResponse === null) {
      return { status: 404, data: { message: 'create Error' } };
    }
    return { status: 200, data: modelResponse };
  }
}

export default MatchesService;
