import { Router } from 'express';
import teamRoute from './TeamRoute';
import loginRoute from './LoginRoute';
import matchRoute from './MatchesRoute';
import leaderBoardRoute from './LeaderBoardRoute';

const router = Router();

router.use('/teams', teamRoute);
router.use('/login', loginRoute);
router.use('/matches', matchRoute);
router.use('/leaderboard', leaderBoardRoute);

export default router;
