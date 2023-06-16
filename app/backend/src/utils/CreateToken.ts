import { JwtPayload, Secret, SignOptions, sign } from 'jsonwebtoken';

class Token {
  static secret: Secret = process.env.JWT_SECRET || 'jwt_secret';
  static jwtConfg: SignOptions = { algorithm: 'HS256' };

  static async createToken(payload: JwtPayload): Promise<string> {
    const token = sign(payload, Token.secret, Token.jwtConfg);
    return token;
  }
}

export default Token;
