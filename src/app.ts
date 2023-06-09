import dotenv from 'dotenv';
import express, { Application } from 'express';
import controllers from './controllers';
import database from './database';
import middleware from './middleware';

dotenv.config();
database.sync();

const app: Application = express();
app.use(express.json());
app.use('/v1/employee', middleware.authentication, controllers.v1.employee);

export default app;
