import React, { Component } from "react";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import axios from "axios";
import { baseAPI } from "./constant";
import 'react-day-picker/lib/style.css';
import Button from "react-bootstrap/Button";

import { formatDate, parseDate } from 'react-day-picker/moment';

export default class Backtest extends Component {
  constructor() {
    super();

    this.handleFromDayChange = this.handleFromDayChange.bind(this);
    this.handleToDayChange = this.handleToDayChange.bind(this);
    this._processBacktest = this._processBacktest.bind(this);
    this.state = {
      selectedFromDay: undefined,
      selectedStrategy: undefined,
      selectedStocks: undefined,
      selectedToDay: undefined,
      strategies: [],
      result: [],
      transactionHistory: [],
    };
  }

  componentDidMount() {
    this.retrieveStrategyList();
  }

  render() {
    return (
      <div id="backtest">
        <div id="backtestForm" className="card">
          {this._renderSelectStrategy()}
          {this._renderFromDatePicker()}
          {this._renderToDatePicker()}
          {this._renderRunButton()}
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

  _renderFromDatePicker() {
    return (
      <div id="fromDatePicker">
        <DayPickerInput
          formatDate={formatDate}
          parseDate={parseDate}
          placeholder={`${formatDate(new Date())}`}
          onDayChange={this.handleFromDayChange}
          id="fromDate"
          dayPickerProps={{
            todayButton: 'Today'
          }}
        />
      </div>
    );
  }

  handleFromDayChange(day) {
    this.setState({
      selectedFromDay: this._convertToLocaleDateString(day)
    });
  }

  handleToDayChange(day) {
    this.setState({
      selectedToDay: this._convertToLocaleDateString(day)
    });
  }

  _convertToLocaleDateString(date) {
    if (!date) return;

    return date.toLocaleDateString();
  }

  _renderToDatePicker() {
    return (
      <div id="toDatePicker">
        <DayPickerInput
          formatDate={formatDate}
          parseDate={parseDate}
          placeholder={`${formatDate(new Date())}`}
          onDayChange={this.handleToDayChange}
          id="toDate"
          dayPickerProps={{
            todayButton: 'Today'
          }}
        />
      </div>
    );
  }

  _renderSelectStrategy() {
    return (
      <div id="backtestDropdown">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="strategyDropDown"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            {this.state.selectedStrategy ? this.state.selectedStrategy.strategy_name : "Select Strategy"}
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

  _renderRunButton() {
    return (
      <div id="runButton">
        <Button onClick={this._processBacktest}>Run</Button>
      </div>
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
      .then(response => {
        this.setState({ transactionHistory: response.data });
      })
      .catch(error => console.error(error));
  }

  _setSelectedStrategy = (strat) => {
    this.setState({
      selectedStrategy: strat,
    });
  }
}