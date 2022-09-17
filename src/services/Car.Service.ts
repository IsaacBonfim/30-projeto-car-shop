import { ICar, carZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';
import CodeError from '../errors/CodeErrors';

const message = 'Object not found';

class CarService implements IService<ICar> {
  private _carModel: IModel<ICar>;
  
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
      throw new CodeError(message, 404);
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
      throw new CodeError(message, 404);
    }

    return updatedCar as ICar;
  }

  public async delete(id: string): Promise<ICar | null> {
    const car = await this._carModel.readOne(id);

    if (!car) {
      throw new CodeError(message, 404);
    }

    const result = await this._carModel.delete(id);

    return result;
  }
}

export default CarService;
