import express from 'express';
import 'express-async-errors';
import errors from './middlewares/Error.Middleware';
import carsRoute from './routes/Car.Routes';

const app = express();
app.use(express.json());

app.use('/cars', carsRoute);

app.use(errors);

export default app;
