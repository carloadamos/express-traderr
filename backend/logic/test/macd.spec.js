import MovingAverageConvergenceDivergence from '../macd.js';
import stocks from './test-data/test-data.js';
import crossOverStocks from './test-data/crossover.testdata.js';
import crossUnderStocks from './test-data/crossunder.testdata.js';

describe('macd', () => {
  it('should be able to acquire moving SMA property', () => {
    const macd = new MovingAverageConvergenceDivergence(stocks, 26, 12, 'close', 9);
    const updatedStocks = macd.compute();

    expect(updatedStocks[9].MACD_SMA9).toBeDefined();
  });

  it('should be able to acquire EMA property', () => {
    const macd = new MovingAverageConvergenceDivergence(stocks, 26, 12, 'close', 9);
    const updatedStocks = macd.compute();

    expect(updatedStocks[12].EMA12).toBeDefined();
  });

  it('should be able to acquire MACD property', () => {
    const macd = new MovingAverageConvergenceDivergence(stocks, 26, 12, 'close', 9);
    const updatedStocks = macd.compute();

    expect(updatedStocks[26].MACD).toBeDefined();
  });

  it('should be able to acquire SIGNAL property', () => {
    const macd = new MovingAverageConvergenceDivergence(stocks, 26, 12, 'close', 9);
    const updatedStocks = macd.compute();

    expect(updatedStocks[26].SIGNAL9).toBeDefined();
  });

  it('should be able to compute for SIGNAL property', () => {
    const macd = new MovingAverageConvergenceDivergence(stocks, 26, 12, 'close', 9);
    const updatedStocks = macd.compute();

    expect(updatedStocks[26].SIGNAL9).toEqual(-0.0559);
  });

  it('should be able to return false if macd crossOver did NOT happen', () => {
    const macStocks = crossOverStocks;
    const result = MovingAverageConvergenceDivergence.crossOver(macStocks[1], macStocks[0], 9);

    expect(result).toBe.false;
  });

  it('should be able to return true if macd crossOver happens', () => {
    const macStocks = crossOverStocks;
    const result = MovingAverageConvergenceDivergence.crossOver(macStocks[0], macStocks[1], 9);

    expect(result).toBe.true;
  });

  it('should be able toThrow error for MACD on CROSSOVER when property does not exist', () => {
    const macStocks = crossOverStocks;
    expect(() =>
      MovingAverageConvergenceDivergence.crossOver(macStocks[0], macStocks[4], 9),
    ).toThrow(Error('MACD CROSSOVER: MACD does not exist!'));
  });

  it('should be able toThrow error for SIGNAL on CROSSOVER when property does not exist', () => {
    const macStocks = crossOverStocks;
    expect(() =>
      MovingAverageConvergenceDivergence.crossOver(macStocks[0], macStocks[5], 9),
    ).toThrow(Error('MACD CROSSOVER: SIGNAL9 does not exist!'));
  });

  it('should be able to return false if macd crossUnder did NOT happen', () => {
    const macStocks = crossUnderStocks;
    const result = MovingAverageConvergenceDivergence.crossUnder(macStocks[1], macStocks[0], 9);

    expect(result).toBe.false;
  });

  it('should be able to return false if macd crossUnder did NOT happen', () => {
    const macStocks = crossUnderStocks;
    const result = MovingAverageConvergenceDivergence.crossOver(macStocks[0], macStocks[1], 9);

    expect(result).toBe.false;
  });

  it('should be able to return true if macd crossUnder happens', () => {
    const macStocks = crossUnderStocks;
    const result = MovingAverageConvergenceDivergence.crossUnder(macStocks[1], macStocks[2], 9);

    expect(result).toBe.true;
  });

  it('should be able toThrow error for MACD on CROSSUNDER when property does not exist', () => {
    const macStocks = crossUnderStocks;
    expect(() =>
      MovingAverageConvergenceDivergence.crossUnder(macStocks[0], macStocks[4], 9),
    ).toThrow(Error('MACD CROSSUNDER: MACD does not exist!'));
  });

  it('should be able toThrow error for SIGNAL on CROSSUNDER when property does not exist', () => {
    const macStocks = crossUnderStocks;
    expect(() =>
      MovingAverageConvergenceDivergence.crossUnder(macStocks[0], macStocks[5], 9),
    ).toThrow(Error('MACD CROSSUNDER: SIGNAL9 does not exist!'));
  });
});
