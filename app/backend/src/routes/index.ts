import { Router } from 'express';
import teamRoute from './TeamRoute';
import loginRoute from './LoginRoute';

const router = Router();

router.use('/teams', teamRoute);
router.use('/login', loginRoute);

export default router;
