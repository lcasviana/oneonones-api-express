import dotenv from 'dotenv';
import express, { Application } from 'express';
import employeeControllerV1 from './controllers/v1/employee.controller';
import database from './database/database';
import { authenticationMiddleware } from './middlewares/authentication';

dotenv.config();
database.sync();

const app: Application = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use('/v1/employee', authenticationMiddleware, employeeControllerV1);

app.listen(port, () => console.log(`http://localhost:${port}`));
