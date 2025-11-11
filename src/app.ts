import cors from 'cors';
import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import routes from './routes/index';

const app = express();

app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());

app.use(errorHandler);

app.use(routes);

export default app;
