import { expect } from '@open-wc/testing';
import MovingAverageConvergenceDivergence from '../src/logic/macd.js';
import stocks from './test-data/macd-test-data.js';

describe('moving-average', async () => {
  it('should be able to acquire moving average 20 property', async () => {
    const updatedStocks = MovingAverageConvergenceDivergence.compute(stocks, 12);

    expect(updatedStocks[26]).to.have.property('MACD');
  });
});
