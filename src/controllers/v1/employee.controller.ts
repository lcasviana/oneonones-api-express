import express, { Request, Response } from 'express';
import { EmployeeModel } from '../../models/employee.model';

const employee = express.Router();

employee.get('/', async (req: Request, res: Response) => {
  const { email } = req.query;
  return email
    ? EmployeeModel.findOne({ where: { email: email as string } })
        .then((employee) => res.json(employee))
        .catch(() => res.sendStatus(500))
    : EmployeeModel.findAll()
        .then((employees) => res.json(employees))
        .catch(() => res.sendStatus(500));
});

employee.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  return EmployeeModel.findOne({ where: { id } })
    .then((employee) => res.json(employee))
    .catch(() => res.sendStatus(500));
});

employee.post('/', async (req: Request, res: Response) => {
  const { name, email } = req.body;
  return EmployeeModel.create({ name, email })
    .then((employee) => res.status(201).json(employee))
    .catch(() => res.sendStatus(500));
});

employee.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  return EmployeeModel.update({ name, email }, { where: { id } })
    .then(() => res.sendStatus(202))
    .catch(() => res.sendStatus(500));
});

employee.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  return EmployeeModel.destroy({ where: { id } })
    .then(() => res.sendStatus(204))
    .catch(() => res.sendStatus(500));
});

export default employee;
