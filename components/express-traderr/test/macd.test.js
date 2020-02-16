import { expect } from '@open-wc/testing';
import MovingAverageConvergenceDivergence from '../src/logic/macd.js';
import stocks from './test-data/test-data.js';

describe('macd', () => {
  it('should be able to acquire moving SMA property', () => {
    const macd = new MovingAverageConvergenceDivergence(stocks);
    const updatedStocks = macd.compute();

    console.log(updatedStocks[26]);
    expect(updatedStocks[9]).to.have.property('MACD_SMA9');
  });

  it('should be able to acquire moving EMA property', () => {
    const macd = new MovingAverageConvergenceDivergence(stocks);
    const updatedStocks = macd.compute();

    expect(updatedStocks[12]).to.have.property('EMA12');
  });

  it('should be able to acquire moving MACD property', () => {
    const macd = new MovingAverageConvergenceDivergence(stocks);
    const updatedStocks = macd.compute();

    expect(updatedStocks[26]).to.have.property('MACD');
  });

  it('should be able to acquire moving MACD property', () => {
    const macd = new MovingAverageConvergenceDivergence(stocks);
    const updatedStocks = macd.compute();

    expect(updatedStocks[26]).to.have.property('SIGNAL9');
  });
});
