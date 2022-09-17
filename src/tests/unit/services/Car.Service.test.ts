import * as sinon from 'sinon';
import { expect } from 'chai';
import { ZodError } from 'zod';
import CarModel from '../../../models/Car.Model';
import CarService from '../../../services/Car.Service';
import { ICar } from '../../../interfaces/ICar';
import { carMock, carMockUpdate, carMockWithId, carsMock } from '../../mocks/Car.mock';

const id = 'iderrado';
const message = 'Object not found';

describe('Testes da camada Service de carros', () => {
  const model = new CarModel();
  const service = new CarService(model);

  describe('Verificação do método "create"', () => {
    beforeEach(() => {
      sinon.stub(model, 'create').resolves(carMockWithId);
    });

    afterEach(sinon.restore);

    it('Verifica se o objeto criado é retornado corretamente', async () => {
      const car = await service.create(carMock);

      expect(car).to.be.deep.equal(carMockWithId);
    });

    it('Verifica se um erro é lançado caso o objeto esteja errado', async () => {
      try {
        await service.create({} as ICar);
      } catch (e: any) {
        expect(e).to.be.instanceOf(ZodError);
      }
    });
  });

  describe('Verificação do método "read"', () => {
    beforeEach(() => {
      sinon.stub(model, 'read').resolves(carsMock);
    });

    afterEach(sinon.restore);

    it('Verifica se um array de carros é retornado corretamente.', async () => {
      const cars = await service.read();

      expect(cars).to.be.an('array');
      expect(cars.length).to.be.equal(4);
    });
  });

  describe('Verificação do método "readOne"', () => {    
    beforeEach(() => {
      sinon.stub(model, 'readOne')
        .onCall(0).resolves(carMockWithId)
        .withArgs(id).resolves(null);
    });

    afterEach(sinon.restore);

    it('Verifica se o carro correto é retornado ao informar uma Id válida', async () => {
      const car = await service.readOne(carMockWithId._id);

      expect(car).to.be.deep.equal(carMockWithId);
    });

    it('Verifica se um erro é lançado caso a id informada não seja encontrada', async () => {
      try {
        await service.readOne(id);
      } catch (e: any) {
        expect(e.code).to.be.equal(404);
        expect(e.message).to.be.deep.equal(message);
      }
    });
  });

  describe('Verificação do método "update"', () => {
    beforeEach(() => {
      sinon.stub(model, 'update')
        .onCall(0).resolves(carMockUpdate)
        .withArgs(id, carMockUpdate).resolves(null);
    });

    afterEach(sinon.restore);

    it('Verifica se o carro atualizado é retornado corretamente', async () => {
      const _id = carMockUpdate._id;
      const car = await service.update(_id, carMockUpdate);

      expect(car).to.be.deep.equal(carMockUpdate);
    });
    
    it('Verifica se um erro é lançado caso a id informada não seja encontrada', async () => {
      try {
        await service.update(id, carMockUpdate);
      } catch (e: any) {
        expect(e.code).to.be.equal(404);
        expect(e.message).to.be.deep.equal(message);        
      }
    });

    it('Verifica se um erro é lançado caso o objeto passado esteja incorreto', async () => {
      const _id = carMockUpdate._id;

      try {
        await service.update(_id, {} as ICar);
      } catch (e: any) {
        expect(e).to.be.instanceOf(ZodError);
      }
    });
  });

  describe('Verificação do método "delete"', () => {
    beforeEach(async () => {
      sinon.stub(model, 'readOne')
        .onCall(0).resolves(carMockWithId)
        .withArgs(id).resolves(null);

      sinon.stub(model, 'delete')
        .onCall(0).resolves(carMockWithId)
        .withArgs(id).resolves(null);
    });

    afterEach(sinon.restore);

    it('Verifica se o carro é deletado corretamente', async () => {
      const result = await service.delete(carMockWithId._id);

      expect(result).to.be.deep.equal(carMockWithId);
    });

    it('Verifica se um erro é lançado caso a id informada não seja encontrada', async () => {
      try {
        await service.delete(id);
      } catch (e: any) {
        expect(e.code).to.be.equal(404);
        expect(e.message).to.be.deep.equal(message);        
      }
    });
  });
});
