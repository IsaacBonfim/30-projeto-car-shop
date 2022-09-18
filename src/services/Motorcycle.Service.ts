import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';
import { IMotorcycle, motorcycleZodSchema } from '../interfaces/IMotorcycle';
import CodeError from '../errors/CodeErrors';

const message = 'Object not found';

class MotorcycleService implements IService<IMotorcycle> {
  private _motoModel: IModel<IMotorcycle>;

  constructor(model: IModel<IMotorcycle>) {
    this._motoModel = model;
  }

  public async create(obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = motorcycleZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    const motorcycle = await this._motoModel.create(obj);

    return motorcycle;
  }

  public async read(): Promise<IMotorcycle[]> {
    const motorcycles = await this._motoModel.read();

    return motorcycles;
  }

  public async readOne(id: string): Promise<IMotorcycle> {
    const motorcycle = await this._motoModel.readOne(id);

    if (!motorcycle) {
      throw new CodeError(message, 404);
    }

    return motorcycle;
  }

  public async update(id: string, obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = motorcycleZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    const motorcycle = await this._motoModel.update(id, obj);

    if (!motorcycle) {
      throw new CodeError(message, 404);
    }

    return motorcycle as IMotorcycle;
  }

  public async delete(id: string): Promise<IMotorcycle | null> {
    const motorcycle = await this._motoModel.readOne(id);

    if (!motorcycle) {
      throw new CodeError(message, 404);
    }

    const result = await this._motoModel.delete(id);

    return result;
  }
}

export default MotorcycleService;
