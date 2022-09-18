import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

class MotorcycleController {
  private _motoService: IService<IMotorcycle>;

  constructor(service: IService<IMotorcycle>) {
    this._motoService = service;
  }

  public async create(
    req: Request &
    { body: IMotorcycle },
    res: Response<IMotorcycle>,
  ): Promise<void> {
    const newMoto = await this._motoService.create(req.body);

    res.status(201).json(newMoto);
  }

  public async read(_req: Request, res: Response): Promise<void> {
    const motos = await this._motoService.read();

    res.status(200).json(motos);
  }

  public async readOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const moto = await this._motoService.readOne(id);

    res.status(200).json(moto);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const moto = await this._motoService.update(id, req.body);

    res.status(200).json(moto);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const result = await this._motoService.delete(id);

    res.status(204).json(result);
  }
}

export default MotorcycleController;
