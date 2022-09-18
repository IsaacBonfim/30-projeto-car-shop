import { Schema, model as MongoModel } from 'mongoose';
import Model from './Mongo.Model';
import { IMotorcycle } from '../interfaces/IMotorcycle';

const motorcycleSchema = new Schema<IMotorcycle>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, { versionKey: false });

class MotorcycleModel extends Model<IMotorcycle> {
  constructor(model = MongoModel<IMotorcycle>('Motorcycle', motorcycleSchema)) {
    super(model);
  }
}

export default MotorcycleModel;
