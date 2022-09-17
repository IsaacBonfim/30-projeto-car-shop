import { Model as MongoModel, isValidObjectId, UpdateQuery } from 'mongoose';
import CodeError from '../errors/CodeErrors';
import { IModel } from '../interfaces/IModel';

const message = 'Id must have 24 hexadecimal characters';

abstract class GenericModel<T> implements IModel<T> {
  private _model: MongoModel<T>;

  constructor(model: MongoModel<T>) {
    this._model = model;
  }

  public async create(obj: T): Promise<T> {
    return this._model.create(obj);
  }

  public async read(): Promise<T[]> {
    const vehicles = await this._model.find();

    return vehicles;
  }

  public async readOne(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) {
      throw new CodeError(message, 400);
    }

    return this._model.findOne({ _id: id });
  }

  public async update(id: string, obj: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(id)) {
      throw new CodeError(message, 400);
    }

    const updatedVehicle = await this._model.findByIdAndUpdate(
      { _id: id }, 
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );

    return updatedVehicle as T;
  }

  public async delete(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) {
      throw new CodeError(message, 400);
    }

    const result = await this._model.deleteOne({ _id: id });

    return result as unknown as T;
  }
}

export default GenericModel;
