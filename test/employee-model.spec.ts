import assert from 'assert';
import * as R from 'ramda';
import { v4 as uuidv4 } from 'uuid';
import { Employee } from '../src/database/models/employee.model';

describe('Employee Model', async () => {
  const employees: Array<Employee> = [];

  before(async () => {
    [1, 2, 3].forEach(async () => {
      const uuid: string = uuidv4().replace('-', '');
      const employee = await Employee.create({ name: uuid, email: `${uuid}@email.test` });
      employees.push(employee);
    });
  });

  after(async () => {
    await Employee.destroy({ where: {}, truncate: true });
  });

  describe('findAll', async () => {
    it('should return all employees', async () => {
      const employees = await Employee.findAll();
      assert.ok(employees.length > 0);
    });
  });

  describe('findOne', async () => {
    it('should return employee', async () => {
      const id = R.path([0, 'id'], employees) as string;
      const employee = await Employee.findOne({ where: { id } });
      assert.ok(employee);
    });
  });
});
