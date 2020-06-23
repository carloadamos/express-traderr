// React 
import React, { Component } from "react";
import axios from "axios";

// Elements
import Button from "react-bootstrap/Button";
import TraderDatepicker from '../../library/trader-datepicker/trader-datepicker.component';
import TraderTextField from '../../library/trader-textfield/trader-textfield.component';
import WindowedSelect from "react-windowed-select";

// Styles
import './style.css';

// Constant
import { baseAPI } from "../../constant"

// Packages
import moment from "moment";

/**
 * @class TestRunner
 * @extends Component
 */
export default class TestRunner extends Component {
  constructor(props) {
    super(props);

    this.stopLossChange = this.stopLossChange.bind(this);
    this.handleStockChange = this.handleStockChange.bind(this);
    this.handleStrategyChange = this.handleStrategyChange.bind(this);
    this.state = {
      fromDay: undefined,
      result: [],
      selectedStock: undefined,
      stockList: [],
      strategies: [],
      stopLoss: 100,
      toDay: undefined,
    };
  }

  componentDidMount() {
    this.retrieveStrategyList();
    this.retrieveStockList();
  }

  render() {
    return (
      <div>
        <div className="header">
          <p>LABORATORY</p>
        </div>
        <div id="tsBody">
          {this._renderTestPanel()}
          {this._renderResultPanel()}
        </div>
      </div>
    );
  }

  _renderTestPanel() {
    return (
      <div id="testPanel">
        <div className="testRunnerControls">
          <div className="card">
            <div className="testRunnerFields">
              {this._renderFromDatePicker()}
              {this._renderToDatePicker()}
              {this._renderSelectStock()}
              {this._renderSelectStrategy()}
              {this._renderStopLoss()}
            </div>
          </div>
          <div className="testRunnerActions">
            <Button id="trSearchBtn" onClick={() => this._processBacktest()}>Start</Button>
            <Button id="trResetBtn">Reset</Button>
          </div>
        </div>
        <div id="tsResults">
          {this._renderResultsTable()}
        </div>
        {
          this.state.result.length !== 0 &&
          (<div id="tsFooter">
            {this._renderPagination()}
            {this._renderTestActions()}
          </div>)
        }
      </div>
    );
  }

  _renderResultPanel() {
    return (
      <div>
        TEST RESULTS
      </div>
    )
  }

  _renderSelectStock() {
    const { selectedStock } = this.state;

    return (
      <div id="tsStockDd">
        <span>Stock</span>
        <div className="dropdown">
          <WindowedSelect
            onChange={this.handleStockChange}
            options={this.state.stockList}
            value={selectedStock}
          />
        </div>
      </div>
    );
  }

  handleStockChange(selectedOption) {
    this.setState({ selectedStock: selectedOption })
  }

  handleStrategyChange(selectedOption) {
    this.setState({ selectedStrategy: selectedOption })
  }

  _renderSelectStrategy() {
    return (
      <div id="tsStratDd">
        <span>Strategy</span>
        <div className="dropdown">
          <WindowedSelect options={this.state.strategies} />
        </div>
      </div>
    );
  }

  _renderFromDatePicker() {
    return (
      <TraderDatepicker label="From" onDayChange={this.handleFromDayChange} />
    );
  }

  handleFromDayChange = (day) => {
    this.setState({ fromDay: day });
  }

  _renderToDatePicker() {
    return (
      <TraderDatepicker label="To" onDayChange={this.handleToDayChange} />
    );
  }

  handleToDayChange = (day) => {
    this.setState({ toDay: day });
  }

  _renderStopLoss() {
    return (
      <TraderTextField label="Stoploss" onChange={this.stopLossChange} />
    )
  }

  /**
   * Set stoploss value.
   * @param {Object} event Event
   */
  stopLossChange(event) {
    this.setState({ stopLoss: event.target.value });
  }

  retrieveStrategyList() {
    axios
      .get(`${baseAPI}strategy/`)
      .then(response => this.setState({
        strategies: response.data.map((value) => {
          console.log(value)
          return {
            label: value.strategy_name,
            value: value._id,
          };
        })
      }))
      .catch(error => console.log(error));
  }

  /**
   * Retrieve and map distinct stock code.
   */
  retrieveStockList() {
    axios
      .post(`${baseAPI}stocks/distinct/`)
      .then(response => this.setState({
        stockList: response.data.map((value) => {
          return {
            label: value,
            value,
          };
        })
      }))
      .catch(error => console.log(error));
  }

  _processBacktest = () => {
    const code = this.state.selectedStock;
    axios
      .post(`${baseAPI}stocks/range/`, {
        dateFrom: this.state.fromDay,
        dateTo: this.state.toDay,
        code,
      })
      .then(response => {
        if (response.data.length === 0) return;

        this._runBacktest(response.data);
      })
      .catch(error => console.error(error));
  }

  /**
   * Perform backtest sequence.
   * @param {Array} stockList List of stock to be tested
   */
  _runBacktest(stockList) {
    const buyStrategy = this.state.selectedStrategy.strategy_buy;
    const sellStrategy = this.state.selectedStrategy.strategy_sell;
    const stopLoss = this.state.stopLoss;

    axios.post(`${baseAPI}back_test/test/`, {
      stockList,
      buyStrategy,
      sellStrategy,
      stopLoss,
    })
      .then(response => {
        if (!response.data) return;

        this.setState({ result: response.data });
        this._saveTransactionHistory(response.data);
      })
      .catch(error => console.error(error));
  }

  /**
   * Save transaction history to database
   * @param {Array} transactionList Transaction history
   */
  _saveTransactionHistory(transactionList) {
    axios.post(`${baseAPI}transaction_history/add`, {
      transactionList,
    })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  }

  _renderResultsTable() {
    return (
      this.state.result.length !== 0 &&
      (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Stock Code</th>
                <th>Bought Date</th>
                <th>Bought Price</th>
                <th>Sold Date</th>
                <th>Sold Price</th>
                <th>Units</th>
                <th>P/&L</th>
                <th>Hold Days</th>
              </tr>
            </thead>
            <tbody>{this.mapResultList()}</tbody>
          </table>
        </div>
      )
    );
  }

  mapResultList() {
    const start = 0;
    const end = 999;
    let count = 0;
    return this.state.result.map((res, i) => {
      count += 1;
      while (count >= start && count <= end) {
        const bought_date = moment(moment(res.bought_date).format('MMM DD, YYYY'));
        const sold_date = moment(moment(res.sold_date).format('MMM DD, YYYY'));

        return (
          <tr key={i}>
            <td> {res.code} </td>
            <td> {bought_date._i} </td>
            <td> {res.bought_price} </td>
            <td> {sold_date._i} </td>
            <td> {res.sold_price} </td>
            <td> {res.units} </td>
            <td> {res.pnl && res.pnl.toFixed(2)} </td>
            <td> {sold_date.diff(bought_date, "days")} </td>
          </tr>
        );
      }
    });
  }

  _renderPagination() {
    return (
      <ul className="pagination">
        <li className="page-item"><a href="#" className="page-link">1</a></li>
        <li className="page-item"><a href="#" className="page-link">2</a></li>
        <li className="page-item"><a href="#" className="page-link">3</a></li>
        <li className="page-item"><a href="#" className="page-link">4</a></li>
        <li className="page-item"><a href="#" className="page-link">5</a></li>
      </ul>
    )
  }

  _renderTestActions() {
    return (
      <div>
        <Button id="tsSave">Save</Button>
      </div>
    )
  }
}

