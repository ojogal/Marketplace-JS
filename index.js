import express from 'express';
import sequelize from './db.js';
import models from './models/models.js';
import cors from 'cors';
import router from './routes/index.js';
import errorHandle from './middleware/errorHandle.js';

const app = express();
const PORT = process.env.PORT || 4001;
app.use(cors());
app.use(express.json());
app.use('/api', router);

// must be last middleware
app.use(errorHandle);

app.get('/', (req, res) => {
  res.json('it works')
});

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