import React, { Component } from "react";
import axios from "axios";
import { baseAPI } from "../constant";
import 'react-day-picker/lib/style.css';
import Button from "react-bootstrap/Button";
import '../style/backtest.style.css'

export default class Backtest extends Component {
  constructor() {
    super();

    this._processBacktest = this._processBacktest.bind(this);
    this.state = {
      selectedStrategy: undefined,
      selectedStocks: undefined,
      strategies: [],
      result: [],
    };
  }

  componentDidMount() {
    this.retrieveStrategyList();
  }

  render() {
    return (
      <div id="backtest">
        <div className="header">
          <p>BACKTESTS</p>
        </div>
        <div id="backtestForm" className="card">
          {this._renderSelectStock()}
          {this._renderSelectStrategy()}
          {this._renderSearchButton()}
          {this._renderResetButton()}
        </div>
        {this._renderResultsTable()}
      </div>
    );
  }

  mapResultList() {
    return this.state.result.map((res, i) => {
      return (
        <tr key={i}>
          <td> {res.code} </td>
          <td> {res.bought_date} </td>
          <td> {res.bought_price} </td>
          <td> {res.sold_date} </td>
          <td> {res.sold_price} </td>
          <td> {res.units} </td>
          <td> {res.pnl} </td>
        </tr>
      );
    });
  }

  retrieveStrategyList() {
    axios
      .get(`${baseAPI}strategy/`)
      .then(response => this.setState({ strategies: response.data }))
      .catch(error => console.log(error));
  }

  _renderSelectStrategy() {
    return (
      <div id="btStratDd">
        <span>Strategy</span>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="strategyDropDown"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            {this.state.selectedStrategy ? this.state.selectedStrategy.strategy_name : "ALL"}
          </button>
          <div className="dropdown-menu" aria-labelledby="strategyDropDown">
            {this.state.strategies.map((strat, i) => {
              return (<a key={i} className="dropdown-item" href="#!" onClick={() => this._setSelectedStrategy(strat)}>{strat.strategy_name}</a>);
            })}
          </div>
        </div>
      </div>
    );
  }

  _renderSelectStock() {
    return (
      <div id="btStockDd">
        <span>Stock</span>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="stockDropDown"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            {this.state.selectedStrategy ? this.state.selectedStrategy.strategy_name : "ALL"}
          </button>
          <div className="dropdown-menu" aria-labelledby="strategyDropDown">
            {this.state.strategies.map((strat, i) => {
              return (<a key={i} className="dropdown-item" href="#!" onClick={() => this._setSelectedStrategy(strat)}>{strat.strategy_name}</a>);
            })}
          </div>
        </div>
      </div>
    );
  }

  _renderResultsTable() {
    return (
      this.state.result.length === 0 ?
        (<h5>No Result</h5>)
        :
        (
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
              </tr>
            </thead>
            <tbody>{this.mapResultList()}</tbody>
          </table>
        )
    );
  }

  _renderSearchButton() {
    return (
      <Button id="btSearchBtn">Search</Button>
    )
  }

  _renderResetButton() {
    return (
      <Button id="btResetBtn">Reset</Button>
    )
  }

  _processBacktest = () => {
    axios
      .post(`${baseAPI}stocks/range/`, {
        dateFrom: this.state.selectedFromDay,
        dateTo: this.state.selectedToDay,
      })
      .then(response => {
        if (!response.data) return;

        console.log(response.data.length)
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
    const dateRange = {
      from: this.state.dateFrom,
      to: this.state.dateTo,
    }

    axios.post(`${baseAPI}back_test/test/`, {
      stockList,
      buyStrategy,
      sellStrategy,
      dateRange,
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

  _setSelectedStrategy = (strat) => {
    this.setState({
      selectedStrategy: strat,
    });
  }
}