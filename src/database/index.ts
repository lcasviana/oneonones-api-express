import { Sequelize } from 'sequelize';

const database = new Sequelize({
  dialect: 'sqlite',
  storage: 'src/database/db.sqlite3',
  define: { timestamps: true },
  logging: false,
});

export default database;
