import { expect } from '@open-wc/testing';
import MovingAverageConvergenceDivergence from '../src/logic/macd.js';
import stocks from './test-data/macd-test-data.js';

describe('moving-average', () => {
  it('should be able to acquire moving average 20 property', () => {
    const macd = new MovingAverageConvergenceDivergence();
    const updatedStocks = macd.compute(stocks, 12);

    expect(updatedStocks[26]).to.have.property('MACD');
  });
});
