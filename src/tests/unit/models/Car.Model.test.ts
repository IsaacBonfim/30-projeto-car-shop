import * as sinon from 'sinon';
import { expect } from 'chai';
import { Model } from 'mongoose';
import CarModel from '../../../models/Car.Model';
import { ICar } from '../../../interfaces/ICar';
import { carMock, carMockUpdate, carMockWithId, carsMock } from '../../mocks/Car.mock';

const message = 'Id must have 24 hexadecimal characters';

describe('Testes da camada Model de carros', () => {
  const model = new CarModel();

  describe('Verificação do método "create"', () => {
    beforeEach(() => {
      sinon.stub(Model, 'create').resolves(carMockWithId);
    });

    afterEach(sinon.restore);

    it('Verifica se o objeto criado é retornado corretamente', async () => {
      const car = await model.create(carMock);

      expect(car).to.be.deep.equal(carMockWithId);
    });
  });

  describe('Verificação do método "read"', () => {
    beforeEach(() => {
      sinon.stub(Model, 'find').resolves(carsMock);
    });

    afterEach(sinon.restore);

    it('Verifica se um array de carros é retornado corretamente.', async () => {
      const cars = await model.read();

      expect(cars).to.be.an('array');
      expect(cars.length).to.be.equal(4);
    });
  });

  describe('Verificação do método "readOne"', () => {
    beforeEach(() => {
      sinon.stub(Model, 'findOne').resolves(carMockWithId);
    });

    afterEach(sinon.restore);

    it('Verifica se o carro correto é retornado ao informar uma Id válida', async () => {
      const id = carMockWithId._id;
      const car = await model.readOne(id);

      expect(car).to.be.an('object');
      expect(Object.keys(car as ICar)).to.have.length(9);
    });

    it('Verifica se um erro é lançado caso a id informada seja inválida', async () => {
      try {
        await model.readOne('iderrado');
      } catch (e: any) {
        expect(e.code).to.be.equal(400);
        expect(e.message).to.be.deep.equal(message);
      }
    });
  });

  describe('Verificação do método "update"', () => {
    beforeEach(() => {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockUpdate);
    });

    afterEach(sinon.restore);

    it('Verifica se o carro atualizado é retornado corretamente', async () => {
      const id = carMockUpdate._id;
      const car = await model.update(id, carMockUpdate);

      expect(car).to.be.deep.equal(carMockUpdate);
    });

    it('Verifica se um erro é lançado caso a id informada seja inválida', async () => {
      try {
        await model.update('iderrado', carMockUpdate);
      } catch (e: any) {
        expect(e.code).to.be.equal(400);
        expect(e.message).to.be.deep.equal(message);
      }
    });
  });

  describe('Verificação do método "delete"', () => {
    beforeEach(() => {
      sinon.stub(Model, 'deleteOne').resolves({
        ...carMock,
        acknowledged: true,
        deletedCount: 1,
      });
    });

    afterEach(sinon.restore);

    it('Verifica se o carro é deletado corretamente', async () => {
      const result = await model.delete(carMockWithId._id);

      expect(result).to.have.property('acknowledged', true);
      expect(result).to.have.property('deletedCount', 1);
    });

    it('Verifica se um erro é lançado caso a id informada seja inválida', async () => {
      try {
        await model.delete('iderrado');
      } catch (e: any) {
        expect(e.code).to.be.equal(400);
        expect(e.message).to.be.deep.equal(message);
      }
    });
  });
});
