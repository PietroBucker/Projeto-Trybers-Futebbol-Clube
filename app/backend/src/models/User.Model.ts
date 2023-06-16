import { IUserModel } from '../Interfaces/IModel';
import { IUser } from '../Interfaces/IUser';
import SequelizeUser from '../database/models/SequelizeUser';

class UserModel implements IUserModel<IUser> {
  private model = SequelizeUser;

  async findByEmail(email: string): Promise<IUser | null> {
    const dbData = await this.model.findOne({ where: { email } });

    if (dbData === null) {
      return null;
    }
    return dbData.dataValues;
  }
}

export default UserModel;
