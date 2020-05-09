import RelativeStrengthIndex from '../rsi.js';
import stocks from './test-data/test-data.js';

describe('ema', () => {
  it('should be able to compute RSI', () => {
    const rsi = new RelativeStrengthIndex(stocks, 14, 'close');
    const rsiList = rsi.compute();

    expect(rsiList[0].upMove).toBeDefined();
    expect(rsiList[0].downMove).toBeDefined();
  });
});
