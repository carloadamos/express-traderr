import { expect } from '@open-wc/testing';
import MovingAverageConvergenceDivergence from '../src/logic/macd.js';
import stocks from './test-data/test-data.js';
import macdStocks from './test-data/crossover.testdata.js';

describe('macd', () => {
  it('should be able to acquire moving SMA property', () => {
    const macd = new MovingAverageConvergenceDivergence(stocks, 26, 12, 'close', 9);
    const updatedStocks = macd.compute();

    expect(updatedStocks[9]).to.have.property('MACD_SMA9');
  });

  it('should be able to acquire EMA property', () => {
    const macd = new MovingAverageConvergenceDivergence(stocks, 26, 12, 'close', 9);
    const updatedStocks = macd.compute();

    expect(updatedStocks[12]).to.have.property('EMA12');
  });

  it('should be able to acquire MACD property', () => {
    const macd = new MovingAverageConvergenceDivergence(stocks, 26, 12, 'close', 9);
    const updatedStocks = macd.compute();

    expect(updatedStocks[26]).to.have.property('MACD');
  });

  it('should be able to acquire SIGNAL property', () => {
    const macd = new MovingAverageConvergenceDivergence(stocks, 26, 12, 'close', 9);
    const updatedStocks = macd.compute();

    expect(updatedStocks[26]).to.have.property('SIGNAL9');
  });

  it('should be able to compute for SIGNAL property', () => {
    const macd = new MovingAverageConvergenceDivergence(stocks, 26, 12, 'close', 9);
    const updatedStocks = macd.compute();

    expect(updatedStocks[26].SIGNAL9).to.be.equal(-0.0559);
  });

  it('should be able to return false if macd crossover did NOT happen', () => {
    const macStocks = macdStocks;
    const result = MovingAverageConvergenceDivergence.crossover(macStocks[1], macStocks[0], 9);

    expect(result).to.be.false;
  });

  it('should be able to return true if macd crossover happens', () => {
    const macStocks = macdStocks;
    const result = MovingAverageConvergenceDivergence.crossover(macStocks[0], macStocks[1], 9);

    expect(result).to.be.true;
  });

  it('should be able to throw error property does not exist', () => {
    const macStocks = macdStocks;
    expect(() =>
      MovingAverageConvergenceDivergence.crossover(macStocks[0], macStocks[4], 9),
    ).to.throw('MACD CROSSOVER: MACD does not exist!');
  });

  it('should be able to throw error property does not exist', () => {
    const macStocks = macdStocks;
    expect(() =>
      MovingAverageConvergenceDivergence.crossover(macStocks[0], macStocks[5], 9),
    ).to.throw('MACD CROSSOVER: SIGNAL9 does not exist!');
  });
});
