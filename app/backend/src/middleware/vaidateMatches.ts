import { NextFunction, Request, Response } from 'express';

class ValidateMatches {
  static validation(req: Request, res: Response, next: NextFunction): Response | void {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    return next();
  }
}

export default ValidateMatches;
