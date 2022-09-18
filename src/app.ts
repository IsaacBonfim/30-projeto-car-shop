import express from 'express';
import 'express-async-errors';
import errors from './middlewares/Error.Middleware';
import carsRoute from './routes/Car.Routes';
import motoRoute from './routes/Motorcycle.Routes';

const app = express();
app.use(express.json());

app.use('/cars', carsRoute);
app.use('/motorcycles', motoRoute);

app.use(errors);

export default app;
