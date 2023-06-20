import { Request, Response, Router } from 'express';
import LeaderBoardController from '../controller/LeaderBoard.Controller';

const leaderBoardRoute = Router();
const leaderBoardController = new LeaderBoardController();

leaderBoardRoute.get(
  '/home',
  (req: Request, res: Response) => leaderBoardController.findAllHome(req, res),
);

leaderBoardRoute.get(
  '/away',
  (req: Request, res: Response) => leaderBoardController.findAllAway(req, res),
);

leaderBoardRoute.get(
  '/',
  (req: Request, res: Response) => leaderBoardController.findAll(req, res),
);
export default leaderBoardRoute;
