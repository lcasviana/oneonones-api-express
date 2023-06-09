import { faker } from '@faker-js/faker';
import assert from 'assert';
import { after } from 'mocha';
import supertest from 'supertest';
import app from '../../src/app';
import { Employee, EmployeeModel } from '../../src/models/employee.model';

const request = supertest(app);
const V1_EMPLOYEE = `/v1/employee`;

describe('Employee v1', () => {
  const [username, password] = ['username', 'password'];
  const employeesCount = 9;

  const seed = async (count: number): Promise<EmployeeModel[]> => {
    const employees = await Promise.all(
      [...new Array(count)].map(async () => {
        const employee: Employee = {
          name: faker.person.fullName(),
          email: faker.internet.email(),
        };
        return await EmployeeModel.create(employee);
      }),
    );
    return employees;
  };

  describe('GET /v1/employee', () => {
    it('should return no employee', async () => {
      await EmployeeModel.destroy({ where: {}, truncate: true });
      const res = await request.get(`${V1_EMPLOYEE}`).auth(username, password);
      assert.equal(res.status, 200);
      assert.equal(res.body.length, 0);
    });

    it('should return five employees', async () => {
      const employees = await seed(employeesCount);
      const employeesId = employees.map((employee) => employee.dataValues.id).sort();
      const res = await request.get(`${V1_EMPLOYEE}`).auth(username, password);
      assert.equal(res.status, 200);
      assert.equal(res.body.length, employeesCount);
      const returned = res.body.map((employee: Employee) => employee.id).sort();
      assert.deepStrictEqual(returned, employeesId);
    });

    it('should return employee by email', async () => {
      const employees = await seed(employeesCount);
      const employee = employees[~~(Math.random() * employeesCount)];
      const res = await request.get(`${V1_EMPLOYEE}?email=${employee.dataValues.email}`).auth(username, password);
      assert.equal(res.status, 200);
      assert.equal(res.body.id, employee.dataValues.id);
    });
  });

  describe('Authorized', () => {
    it('GET /v1/employee', async () => {
      const res = await request.get(`${V1_EMPLOYEE}`).auth(username, password);
      assert.notEqual(res.status, 401);
    });

    it('GET /v1/employee/:id', async () => {
      const res = await request.get(`${V1_EMPLOYEE}/${faker.string.uuid()}`).auth(username, password);
      assert.notEqual(res.status, 401);
    });

    it('POST /v1/employee', async () => {
      const res = await request.post(`${V1_EMPLOYEE}`).auth(username, password);
      assert.notEqual(res.status, 401);
    });

    it('PUT /v1/employee/:id', async () => {
      const res = await request.post(`${V1_EMPLOYEE}/${faker.string.uuid()}`).auth(username, password);
      assert.notEqual(res.status, 401);
    });

    it('DELETE /v1/employee/:id', async () => {
      const res = await request.post(`${V1_EMPLOYEE}/${faker.string.uuid()}`).auth(username, password);
      assert.notEqual(res.status, 401);
    });
  });

  describe('Unauthorized', () => {
    it('GET /v1/employee', async () => {
      const res = await request.get(`${V1_EMPLOYEE}`);
      assert.equal(res.status, 401);
    });

    it('GET /v1/employee/:id', async () => {
      const res = await request.get(`${V1_EMPLOYEE}/${faker.string.uuid()}`);
      assert.equal(res.status, 401);
    });

    it('POST /v1/employee', async () => {
      const res = await request.post(`${V1_EMPLOYEE}`);
      assert.equal(res.status, 401);
    });

    it('PUT /v1/employee/:id', async () => {
      const res = await request.post(`${V1_EMPLOYEE}/${faker.string.uuid()}`);
      assert.equal(res.status, 401);
    });

    it('DELETE /v1/employee/:id', async () => {
      const res = await request.post(`${V1_EMPLOYEE}/${faker.string.uuid()}`);
      assert.equal(res.status, 401);
    });
  });

  after(async () => {
    await EmployeeModel.destroy({ where: {}, truncate: true });
  });
});
