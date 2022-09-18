import { Router } from 'express';
import CarModel from '../models/Car.Model';
import CarService from '../services/Car.Service';
import CarController from '../controllers/Car.Controller';

const router = Router();

const model = new CarModel();
const service = new CarService(model);
const controller = new CarController(service);

router
  .get('/', (req, res) => controller.read(req, res))
  .post('/', (req, res) => controller.create(req, res))
  .get('/:id', (req, res) => controller.readOne(req, res))
  .put('/:id', (req, res) => controller.update(req, res))
  .delete('/:id', (req, res) => controller.delete(req, res));

export default router;
