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

  declare inProgress: boolean;
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
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
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
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
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

SequelizeMatche.belongsTo(SequelizeTeam, { foreignKey: 'homeTeamId', as: 'homeTeam' });
SequelizeMatche.belongsTo(SequelizeTeam, { foreignKey: 'awayTeamId', as: 'awayTeam' });

SequelizeTeam.hasMany(SequelizeMatche, { foreignKey: 'homeTeamId', as: 'homeTeam' });
SequelizeTeam.hasMany(SequelizeMatche, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default SequelizeMatche;
