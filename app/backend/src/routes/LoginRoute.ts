import { Request, Response, Router } from 'express';
import ValidateLogin from '../middleware/validateLogin';
import LoginController from '../controller/Login.Controller';
import ValidateToken from '../middleware/validateToken';

const loginRoute = Router();
const loginController = new LoginController();

loginRoute.post(
  '/',
  ValidateLogin.validation,
  (req: Request, res: Response) => loginController.login(req, res),
);
loginRoute.get(
  '/role',
  ValidateToken.validation,
  (req, res: Response) => {
    const { role } = req.body.token;
    return res.status(200).json({ role });
  },
);

export default loginRoute;
