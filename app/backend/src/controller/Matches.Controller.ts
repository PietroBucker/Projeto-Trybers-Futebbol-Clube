import { Request, Response } from 'express';
import MatchesService from '../services/Matches.Service';

class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  async findAll(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.matchesService.findAll();
    return res.status(status).json(data);
  }

  async findAllInProgress(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;

    const { status, data } = await this.matchesService
      .findAllInProgress(inProgress !== 'false');
    return res.status(status).json(data);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.matchesService.findById(Number(id));
    if (status !== 200) {
      return res.status(status).json(data);
    }
    return res.status(status).json(data);
  }

  async finishingUpdate(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.matchesService.finishingUpdate(Number(id));
    if (status !== 200) {
      return res.status(status).json(data);
    }
    return res.status(status).json(data);
  }

  async updateMatches(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { token, ...body } = req.body;
    const { status, data } = await this.matchesService.updateMatches(Number(id), body);
    if (status !== 200) {
      return res.status(status).json(data);
    }
    return res.status(status).json(data);
  }

  async createMatches(req: Request, res: Response): Promise<Response> {
    const { token, ...body } = req.body;
    const { status, data } = await this.matchesService.createMatches(body);
    if (status !== 200) {
      return res.status(status).json(data);
    }
    return res.status(status).json(data);
  }
}

export default MatchesController;
