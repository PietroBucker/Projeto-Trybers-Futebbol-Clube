import { Request, Response } from 'express';
import TeamService from '../services/Team.Service';

class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  async findAll(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.teamService.findAll();
    return res.status(status).json(data);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.teamService.findById(Number(id));
    if (status !== 200) {
      return res.status(status).json(data);
    }
    return res.status(status).json(data);
  }
}

export default TeamController;
