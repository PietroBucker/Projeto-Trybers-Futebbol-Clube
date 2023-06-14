import { Request, Response, Router } from 'express';
import TeamController from '../controller/Team.Controller';

const teamRoute = Router();
const teamController = new TeamController();

teamRoute.get('/:id', (req: Request, res: Response) => teamController.findById(req, res));
teamRoute.get('/', (req: Request, res: Response) => teamController.findAll(req, res));

export default teamRoute;
