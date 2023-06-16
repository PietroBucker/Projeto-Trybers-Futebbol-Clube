import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

class ValidateToken {
  static secret: string = process.env.JWT_SECRET || 'jwt_secret';

  static validation(req: Request, res: Response, next: NextFunction): Response | void {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const dataToken = verify(token, ValidateToken.secret) as JwtPayload;
      req.body.token = dataToken;
      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}

export default ValidateToken;
