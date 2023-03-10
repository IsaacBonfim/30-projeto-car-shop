import { Schema, model as MongoModel } from 'mongoose';
import Model from './Mongo.Model';
import { ICar } from '../interfaces/ICar';

const carSchema = new Schema<ICar>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });

class CarModel extends Model<ICar> {
  constructor(model = MongoModel<ICar>('Car', carSchema)) {
    super(model);
  }
}

export default CarModel;
