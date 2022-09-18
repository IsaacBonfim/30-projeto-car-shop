import { Router } from 'express';
import MotoModel from '../models/Motorcycle.Model';
import MotoService from '../services/Motorcycle.Service';
import MotoController from '../controllers/Motorcycle.Controller';

const router = Router();

const model = new MotoModel();
const service = new MotoService(model);
const controller = new MotoController(service);

router
  .get('/', (req, res) => controller.read(req, res))
  .post('/', (req, res) => controller.create(req, res))
  .get('/:id', (req, res) => controller.readOne(req, res))
  .put('/:id', (req, res) => controller.update(req, res))
  .delete('/:id', (req, res) => controller.delete(req, res));

export default router;
