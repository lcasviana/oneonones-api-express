import express, { Request, Response } from 'express';
import validator from 'validator';
import { EmployeeModel } from '../../models/employee.model';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const { email } = req.query;
  if (email) {
    if (!validator.isEmail(email as string)) return res.sendStatus(400);
    return EmployeeModel.findOne({ where: { email: email as string } })
      .then((employee) => res.json(employee))
      .catch((err: Error) => res.send(err));
  } else {
    return EmployeeModel.findAll()
      .then((employees) => res.json(employees))
      .catch((err: Error) => res.send(err));
  }
});

router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  if (!validator.isUUID(id, 4)) return res.sendStatus(400);
  return EmployeeModel.findOne({ where: { id } })
    .then((employee) => res.json(employee))
    .catch((err: Error) => res.send(err));
});

router.post('/', (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (
    validator.isEmpty(name, { ignore_whitespace: true }) ||
    !validator.isLength(name, { min: 3, max: 255 }) ||
    !validator.isEmail(email)
  )
    return res.sendStatus(400);
  return EmployeeModel.create({ name, email })
    .then((employee) => res.status(201).json(employee))
    .catch((err: Error) => res.send(err));
});

router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  if (!validator.isUUID(id, 4)) return res.sendStatus(400);
  if (
    !validator.isUUID(id, 4) ||
    validator.isEmpty(name, { ignore_whitespace: true }) ||
    !validator.isLength(name, { min: 3, max: 255 }) ||
    !validator.isEmail(email)
  )
    return res.sendStatus(400);
  return EmployeeModel.update({ name, email }, { where: { id } })
    .then(() => res.sendStatus(202))
    .catch((err: Error) => res.send(err));
});

router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  if (!validator.isUUID(id, 4)) return res.sendStatus(400);
  return EmployeeModel.destroy({ where: { id } })
    .then(() => res.sendStatus(204))
    .catch((err: Error) => res.send(err));
});

router.use((_err: Error, _req: Request, res: Response) => res.sendStatus(500));

export const employeeControllerV1 = router;
