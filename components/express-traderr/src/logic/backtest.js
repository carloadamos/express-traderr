import SimpleMovingAverage from './sma.js';
import ExponentialMovingAverage from './ema.js';
import MovingAverageConvergenceDivergence from './macd.js';
import Strategy from './strategy.js';

const SIGNALS = Object.freeze({
  UPTREND: 'uptrend',
  PRICE_ABOVE_EMA: 'price-above-ema',
  PRICE_ABOVE_SMA: 'price-above-sma',
  MACD_CROSSOVER: 'macd-crossover',

  DOWNTREND: 'downtrend',
  PRICE_BELOW_EMA: 'price-below-ema',
  PRICE_BELOW_SMA: 'price-below-sma',
  MACD_CROSSUNDER: 'macd-crossunder',
});

export default class BackTest {
  /**
   * You know what constructor is. Just feed me with parameters that it need.
   * @param {Array} stockList List of stocks to perform backtest on.
   * @param {String} strategy Long or short. Default to `long`.
   * @param {Array} signals Signals to look for when entering a position.
   */
  constructor(stockList, strategy, signals) {
    this.stockList = stockList;
    this.strategy = strategy;
    this.signals = signals;
    this.position = [];
    this._initialize();
  }

  /**
   * Prepares for the backtesting.
   * This method will prepare the indicators.
   * Performs all the computations before the actual logic.
   */
  _initialize() {
    const signals = [...this.signals.buy, ...this.signals.sell];

    signals.forEach(signal => {
      switch (signal.code) {
        case SIGNALS.UPTREND:
        case SIGNALS.DOWNTREND:
        case SIGNALS.PRICE_ABOVE_SMA:
        case SIGNALS.PRICE_BELOW_SMA: {
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
        case SIGNALS.PRICE_ABOVE_EMA:
        case SIGNALS.PRICE_BELOW_EMA: {
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
        case SIGNALS.MACD_CROSSOVER:
        case SIGNALS.MACD_CROSSUNDER: {
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
          console.error(`SIGNAL [${signal.code}] is not implemented.`);
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
      const buySignal = this.signals.buy ? this.signals.buy : [];
      const sellSignal = this.signals.sell ? this.signals.sell : [];
      const buyPerfectScore = buySignal ? buySignal.length : 0;
      const sellPerfectScore = sellSignal ? sellSignal.length : 0;
      let buyScore = 0;
      let sellScore = 0;

      if (this.lastAction() === 'Nothing' || this.lastAction() === 'sell') {
        buySignal.forEach(signal => {
          switch (signal.code) {
            case SIGNALS.MACD_CROSSOVER: {
              const currentIndex = this.stockList.indexOf(stock);

              if (currentIndex !== 0) {
                const previousStock = this.stockList[currentIndex - 1];
                const currentStock = stock;

                buyScore = MovingAverageConvergenceDivergence.crossOver(
                  previousStock,
                  currentStock,
                  signal.signalLength,
                )
                  ? (buyScore += 1)
                  : buyScore;
              }
              break;
            }
            case SIGNALS.UPTREND: {
              buyScore = SimpleMovingAverage.upTrend(stock) ? (buyScore += 1) : buyScore;
              break;
            }
            case SIGNALS.PRICE_ABOVE_EMA: {
              buyScore = ExponentialMovingAverage.priceAbove(stock, signal.periods[0], 'close')
                ? (buyScore += 1)
                : buyScore;
              break;
            }
            case SIGNALS.PRICE_ABOVE_SMA: {
              buyScore = SimpleMovingAverage.priceAbove(stock, signal.periods[0], 'close')
                ? (buyScore += 1)
                : buyScore;
              break;
            }
            default: {
              console.error(`BUY SIGNAL: [${signal.code}] is not implemented!`);
            }
          }
        });

        if (buySignal.length !== 0 && buyScore === buyPerfectScore) {
          this.position = [...this.position, Strategy.buy(stock, 'long')];
        }
      }

      if (this.lastAction() === 'buy') {
        sellSignal.forEach(signal => {
          switch (signal.code) {
            case SIGNALS.MACD_CROSSUNDER: {
              const currentIndex = this.stockList.indexOf(stock);

              if (currentIndex !== 0) {
                const previousStock = this.stockList[currentIndex - 1];
                const currentStock = stock;

                sellScore = MovingAverageConvergenceDivergence.crossUnder(
                  previousStock,
                  currentStock,
                  signal.signalLength,
                )
                  ? (sellScore += 1)
                  : sellScore;
              }
              break;
            }
            case SIGNALS.DOWNTREND: {
              sellScore = SimpleMovingAverage.downTrend(stock) ? (sellScore += 1) : sellScore;
              break;
            }
            case SIGNALS.PRICE_BELOW_EMA: {
              sellScore = ExponentialMovingAverage.priceBelow(stock, signal.periods[0], 'close')
                ? (sellScore += 1)
                : sellScore;
              break;
            }
            case SIGNALS.PRICE_BELOW_SMA: {
              sellScore = SimpleMovingAverage.priceBelow(stock, signal.periods[0], 'close')
                ? (sellScore += 1)
                : sellScore;
              break;
            }
            default: {
              console.error(`SELL SIGNAL: [${signal.code}] is not implemented!`);
            }
          }
        });

        if (sellSignal.length !== 0 && sellScore === sellPerfectScore) {
          console.log(
            'P/L: ',
            parseFloat(stock.close - this.position[this.position.length - 1].stock.close).toFixed(
              4,
            ),
          );
          this.position = [...this.position, Strategy.sell(stock, 'long')];
        }
      }
    });
  }

  lastAction() {
    if (this.position.length === 0) return 'Nothing';

    return this.position[this.position.length - 1].action;
  }
}
