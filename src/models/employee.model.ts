import { DataTypes, Model } from 'sequelize';
import * as uuid from 'uuid';
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
      defaultValue: () => uuid.v4(),
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
