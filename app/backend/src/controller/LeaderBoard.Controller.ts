import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoard.Service';

class LeaderBoardController {
  constructor(
    private leaderBoardService = new LeaderBoardService(),
  ) {}

  async findAllHome(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.leaderBoardService
      .findAllHome(false);
    return res.status(status).json(data);
  }

  async findAllAway(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.leaderBoardService
      .findAllAway(false);
    return res.status(status).json(data);
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.leaderBoardService
      .findAll(false);
    return res.status(status).json(data);
  }
}

export default LeaderBoardController;
