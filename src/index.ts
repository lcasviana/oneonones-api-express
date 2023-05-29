import express, { Application } from 'express';
import employeeControllerV1 from './controllers/v1/employee.controller';
import database from './database/database';
import { authenticationMiddleware } from './middlewares/authentication';

database.sync();

const app: Application = express();
const port = 3000;

app.use(express.json());
app.use('/v1/employee', authenticationMiddleware, employeeControllerV1);

app.listen(port, async () => {
  console.log(`http://localhost:${port}`);
});
