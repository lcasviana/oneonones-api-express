import { DataTypes, Model } from 'sequelize';
import database from '../database';

export interface Employee {
  id?: string;
  name?: string;
  email?: string;
}

export class EmployeeModel extends Model<Employee> {}

EmployeeModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        isUUID: 4,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[a-z][a-z'-.]{0,}( [a-z][a-z'-.]{0,}){0,}$/i,
        len: [3, 255],
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        len: [3, 255],
      },
    },
  },
  {
    sequelize: database,
    modelName: 'Employee',
    tableName: 'employees',
  },
);
