import { CreationOptional, DataTypes,
  InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import db from '.';
import SequelizeTeam from './SequelizeTeam';

class SequelizeMatche extends Model<InferAttributes<SequelizeMatche>,
InferCreationAttributes<SequelizeMatche>> {
  declare id: CreationOptional<number>;

  declare homeTeamId: number;

  declare homeTeamGoals: number;

  declare awayTeamId: number;

  declare awayTeamGoals: number;

  declare inProgress: number;
}

SequelizeMatche.init({
  id: {
    type: DataTypes.NUMBER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

SequelizeMatche.belongsTo(SequelizeTeam, { foreignKey: 'homeTeamId' });
SequelizeMatche.belongsTo(SequelizeTeam, { foreignKey: 'awayTeamId' });

SequelizeTeam.hasMany(SequelizeMatche, { foreignKey: 'homeTeamId' });
SequelizeTeam.hasMany(SequelizeMatche, { foreignKey: 'awayTeamId' });

export default SequelizeMatche;
