import { Sequelize } from 'sequelize';

const database = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE,
  define: { timestamps: true },
  logging: false,
});

export default database;
