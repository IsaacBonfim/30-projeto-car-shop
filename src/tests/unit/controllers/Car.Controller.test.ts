import * as sinon from 'sinon';
import { expect } from 'chai';
import { Request, Response } from 'express';
import CarModel from '../../../models/Car.Model';
import CarService from '../../../services/Car.Service';
import CarController from '../../../controllers/Car.Controller';
import { carMock, carMockUpdate, carMockWithId, carsMock } from '../../mocks/Car.mock';

describe('Testes da camada Controller de carros', () => {
  const model = new CarModel();
  const service = new CarService(model);
  const controller = new CarController(service);

  const req = {} as Request;
  const res = {} as Response;

  describe('Verificação do método "create"', () => {
    beforeEach(() => {
      sinon.stub(service, 'create').resolves(carMockWithId);

      req.body = carMock;

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    afterEach(sinon.restore);

    it('Verifica se o status 201 e o objeto criado são retornados corretamente', async () => {
      await controller.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('Verificação do método "read"', () => {
    beforeEach(() => {
      sinon.stub(service, 'read').resolves(carsMock);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    afterEach(sinon.restore);

    it('Verifica se o status 200 é retornado corretamente', async () => {
      await controller.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsMock)).to.be.true;
    });
  });

  describe('Verificação do método "readOne"', () => {
    beforeEach(() => {
      sinon.stub(service, 'readOne').resolves(carMockWithId);

      req.params = { id: carMockWithId._id };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    afterEach(sinon.restore);

    it('Verifica se o status 200 e o objeto requisitado são retornados corretamente', async () => {
      await controller.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('Verificação do método "update"', () => {
    beforeEach(() => {
      sinon.stub(service, 'update').resolves(carMockUpdate);

      req.params = { id: carMockWithId._id };
      req.body = carMockUpdate;

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    afterEach(sinon.restore);

    it('Verifica se o status 200 e o objeto atualizado são retornados corretamente', async () => {
      await controller.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockUpdate)).to.be.true;
    });
  });

  describe('Verificação do método "delete"', () => {
    beforeEach(() => {
      sinon.stub(service, 'delete').resolves(carMockWithId);

      req.params = { id: carMockWithId._id };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    afterEach(sinon.restore);

    it('Verifica se o status 204 é retornado corretamente', async () => {
      await controller.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });
});
