import * as bcrypt from 'bcryptjs';
import { IUser } from '../Interfaces/IUser';
import { IUserModel } from '../Interfaces/IModel';
import { ServiceResponse } from '../Interfaces/ServiceRespose';
import UserModel from '../models/User.Model';
import Token from '../utils/CreateToken';

class LoginService {
  constructor(
    private userModel: IUserModel<IUser> = new UserModel(),
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<ServiceResponse<{ token: string }>> {
    const modelResponse = await this.userModel.findByEmail(email);

    if (!modelResponse || !await bcrypt.compare(password, modelResponse.password)) {
      return { status: 401, data: { message: 'Invalid email or password' } };
    }
    // console.log(password, modelResponse);
    const { password: _password, ...data } = modelResponse;
    const token = await Token.createToken(data);
    return { status: 200, data: { token } };
  }
}

export default LoginService;
