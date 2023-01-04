import express from 'express';
import sequelize from './db.js';

const app = express();
const PORT = process.env.PORT || 4001;

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server started on PORT http://localhost:${PORT}..`)
    })
  } catch (e) {
    console.log(e)
  }
};

start();