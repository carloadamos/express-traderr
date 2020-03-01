import SimpleMovingAverage from './sma.js';
import ExponentialMovingAverage from './ema.js';
import MovingAverageConvergenceDivergence from './macd.js';
import Strategy from './strategy.js';

const SIGNALS = Object.freeze({
  UPTREND: 'uptrend',
  PRICE_ABOVE_EMA: 'price-above-ema',
  PRICE_ABOVE_SMA: 'price-above-sma',
  MACD_CROSSOVER: 'macd-crossover',
});

export default class BackTest {
  /**
   * You know what constructor is. Just feed me with parameters that I need.
   * @param {Array} stockList List of stocks to perform backtest on.
   * @param {String} strategy Long or short. Default to `long`.
   * @param {Array} signals Signals to look for when entering a position.
   */
  constructor(stockList, strategy, signals) {
    this.stockList = stockList;
    this.strategy = strategy;
    this.signals = signals;
    this._initialize();
  }

  /**
   * Prepares for the backtesting.
   * This method will prepare the indicators.
   * Performs all the computations before the actual logic.
   */
  _initialize() {
    this.signals.forEach(signal => {
      switch (signal.code) {
        case SIGNALS.UPTREND:
        case SIGNALS.PRICE_ABOVE_SMA: {
          const { periods, source, newProperty } = signal;

          periods.forEach(period => {
            const sma = new SimpleMovingAverage(this.stockList, period, source, newProperty);
            this.stockList = sma.compute();
          });

          if (periods.length >= 2) {
            /* Always put the slow at the start of the list */
            this.stockList = SimpleMovingAverage.identifyTrend(
              this.stockList,
              periods[0],
              periods[1],
            );
          }
          break;
        }
        case SIGNALS.PRICE_ABOVE_EMA: {
          const { periods, source, newProperty, smaSource } = signal;
          const ema = new ExponentialMovingAverage(
            this.stockList,
            periods[0],
            source,
            newProperty,
            smaSource,
          );
          this.stockList = ema.compute();
          break;
        }
        case SIGNALS.MACD_CROSSOVER: {
          const { fastLength, slowLength, source, signalLength } = signal;
          const macd = new MovingAverageConvergenceDivergence(
            this.stockList,
            fastLength,
            slowLength,
            source,
            signalLength,
          );
          this.stockList = macd.compute();
          break;
        }
        default: {
          console.warn(`Signal ${signal.code} is not implemented.`);
        }
      }
    });
  }

  /**
   * Start backtest process.
   * signal: macd-crossover, uptrend
   */
  start() {
    this.stockList.forEach(stock => {
      const perfectScore = this.signals.length;
      let score = 0;

      this.signals.forEach(signal => {
        switch (signal.code) {
          case SIGNALS.MACD_CROSSOVER: {
            const currentIndex = this.stockList.indexOf(stock);

            if (currentIndex !== 0) {
              const previousStock = this.stockList[currentIndex - 1];
              const currentStock = stock;

              score = MovingAverageConvergenceDivergence.crossOver(
                previousStock,
                currentStock,
                signal.signalLength,
              )
                ? (score += 1)
                : score;
            }
            break;
          }
          case SIGNALS.UPTREND: {
            score = SimpleMovingAverage.upTrend(stock) ? (score += 1) : score;
            break;
          }
          case SIGNALS.PRICE_ABOVE_EMA: {
            score = ExponentialMovingAverage.priceAbove(stock, signal.periods[0], 'close')
              ? (score += 1)
              : score;
            break;
          }
          case SIGNALS.PRICE_ABOVE_SMA: {
            score = SimpleMovingAverage.priceAbove(stock, signal.periods[0], 'close')
              ? (score += 1)
              : score;
            break;
          }
          default: {
            console.error(`Signal ${signal.code} is not implemented!`);
          }
        }
      });

      if (score === perfectScore) {
        Strategy.buy(stock, 'long');
      }
    });
  }
}
