import { Request, Response, Router } from 'express';
import MatchesController from '../controller/Matches.Controller';
import ValidateToken from '../middleware/validateToken';

const matchRoute = Router();

const matchesController = new MatchesController();

matchRoute.get(
  '/',
  ValidateToken.validation,
  (req: Request, res: Response) => matchesController.findAllInProgress(req, res),
);

matchRoute.get(
  '/',
  ValidateToken.validation,
  (req: Request, res: Response) => matchesController.findAll(req, res),
);

matchRoute.patch(
  '/:id',
  ValidateToken.validation,
  (req: Request, res: Response) => matchesController.updateMatches(req, res),
);

matchRoute.patch(
  '/:id/finish',
  ValidateToken.validation,
  (req: Request, res: Response) => matchesController.finishingUpdate(req, res),
);

export default matchRoute;
