import assert from 'assert';
import * as R from 'ramda';
import * as uuid from 'uuid';
import { EmployeeModel } from '../src/models/employee.model';

describe('Employee Model', async () => {
  const employees: Array<EmployeeModel> = [];

  before(async () => {
    [1, 2, 3].forEach(async () => {
      const id: string = uuid.v4().replace('-', '');
      const employee = await EmployeeModel.create({ name: id, email: `${id}@email.test` });
      employees.push(employee);
    });
  });

  after(async () => {
    await EmployeeModel.destroy({ where: {}, truncate: true });
  });

  describe('findAll', async () => {
    it('should return all employees', async () => {
      const employees = await EmployeeModel.findAll();
      assert.ok(employees.length > 0);
    });
  });

  describe('findOne', async () => {
    it('should return employee', async () => {
      const id = R.path([0, 'id'], employees) as string;
      const employee = await EmployeeModel.findOne({ where: { id } });
      assert.ok(employee);
    });
  });
});
