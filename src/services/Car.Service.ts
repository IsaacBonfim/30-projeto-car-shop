import { ICar, carZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';
import CodeError from '../errors/CodeErrors';

class CarService implements IService<ICar> {
  private _carModel: IModel<ICar>;
  private _message = 'Vehicle not found';
  
  constructor(model: IModel<ICar>) { this._carModel = model; }

  public async create(obj: ICar): Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    const newCar = await this._carModel.create(obj);

    return newCar;
  }

  public async read(): Promise<ICar[]> {
    const cars = await this._carModel.read();

    return cars;
  }

  public async readOne(id: string): Promise<ICar> {
    const car = await this._carModel.readOne(id);

    if (!car) {
      throw new CodeError(this._message, 404);
    }

    return car as ICar;
  }

  public async update(id: string, obj: ICar): Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    const updatedCar = await this._carModel.update(id, obj);

    if (!updatedCar) {
      throw new CodeError(this._message, 404);
    }

    return updatedCar;
  }

  public async delete(id: string): Promise<ICar | null> {
    const result = await this._carModel.delete(id);

    if (!result) {
      throw new CodeError(this._message, 404);
    }

    return result;
  }
}

export default CarService;
