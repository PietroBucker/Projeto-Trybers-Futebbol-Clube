import { NextFunction, Request, Response } from 'express';

class ValidateLogin {
  static validation(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const emailRegex = (/^[a-z0-9._]+@[a-z0-9]+\.[a-z]?/ig).test(email);
    if (!emailRegex || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return next();
  }
}

export default ValidateLogin;
