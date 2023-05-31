import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import database from '../database';

export interface IEmployee {
  id?: string;
  name?: string;
  email?: string;
}

export class Employee extends Model<IEmployee> {}

Employee.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: database,
    modelName: 'Employee',
    tableName: 'employees',
  },
);
