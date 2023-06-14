import { Router } from 'express';
import teamRoute from './TeamRoute';

const router = Router();

router.use('/teams', teamRoute);

export default router;
