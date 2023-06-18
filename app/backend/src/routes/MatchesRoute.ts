import { Request, Response, Router } from 'express';
import MatchesController from '../controller/Matches.Controller';
import ValidateToken from '../middleware/validateToken';
import ValidateMatches from '../middleware/vaidateMatches';

const matchRoute = Router();

const matchesController = new MatchesController();

matchRoute.get(
  '/',
  (req: Request, res: Response) => matchesController.findAllInProgress(req, res),
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

matchRoute.post(
  '/',
  ValidateToken.validation,
  ValidateMatches.validation,
  (req: Request, res: Response) => matchesController.createMatches(req, res),
);

export default matchRoute;
