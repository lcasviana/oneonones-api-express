import express, { Request, RequestHandler, Response, Router } from 'express';
import Employee from '../../database/models/employee.model';

// GET /employees
const getEmployees: RequestHandler = async (req: Request, res: Response) => {
  const { email } = req.query;
  if (email) {
    const employee = await Employee.findOne({ where: { email: email as string } });
    if (!employee) return res.sendStatus(404);
    return res.json(employee);
  } else {
    const employees = await Employee.findAll();
    return res.json(employees);
  }
};

// GET /employees/:id
const getEmployeeById: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const employee = await Employee.findOne({ where: { id } });
  if (!employee) return res.sendStatus(404);
  return res.json(employee);
};

// POST /employees
const createEmployee: RequestHandler = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const employee = await Employee.create({ name, email });
  res.status(201).json(employee);
};

// PUT /employees/:id
const updateEmployee: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const employee = await Employee.findOne({ where: { id } });
  if (!employee) return res.sendStatus(404);
  await Employee.update({ name, email }, { where: { id } });
  return res.sendStatus(202);
};

// DELETE /employees/:id
const deleteEmployee: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const employee = await Employee.findOne({ where: { id } });
  if (!employee) return res.sendStatus(404);
  await Employee.destroy({ where: { id } });
  return res.sendStatus(204);
};

const router: Router = express.Router();

router.get('/', getEmployees);
router.get('/:id', getEmployeeById);
router.post('/', createEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

export default router;
