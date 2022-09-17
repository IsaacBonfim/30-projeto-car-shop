import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

class CarController {
  private _carService: IService<ICar>;

  constructor(service: IService<ICar>) { this._carService = service; }

  public async create(req: Request & { body: ICar }, res: Response<ICar>): Promise<void> {
    const newCar = await this._carService.create(req.body);

    res.status(201).json(newCar);
  }

  public async read(_req: Request, res: Response): Promise<void> {
    const cars = await this._carService.read();

    res.status(200).json(cars);
  }

  public async readOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const car = await this._carService.readOne(id);

    res.status(200).json(car);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const car = await this._carService.update(id, req.body);

    res.status(200).json(car);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const result = await this._carService.delete(id);

    res.status(203).json(result);
  }
}

export default CarController;
