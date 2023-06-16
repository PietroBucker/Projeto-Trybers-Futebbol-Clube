import { Request, Response } from 'express';
import LoginService from '../services/Login.Service';

class LoginController {
  constructor(
    private loginService = new LoginService(),
  ) {}

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const { status, data } = await this.loginService.login(email, password);
    if (status !== 200) {
      return res.status(status).json(data);
    }
    return res.status(status).json(data);
  }
}

export default LoginController;
