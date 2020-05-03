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
    this.state = {
      selectedFromDay: undefined,
      selectedStrategy: undefined,
      selectedToDay: undefined,
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
          <td> {res.exec_id} </td>
          <td> {res.stock_code} </td>
          <td> {res.stock_bought_date} </td>
          <td> {res.stock_bought_price} </td>
          <td> {res.stock_sold_date} </td>
          <td> {res.stock_sold_price} </td>
          <td> {res.stock_units} </td>
          <td> {res.stock_pnl} </td>
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
      selectedFromDay: this.convertToUTC(day),
    });
  }

  handleToDayChange(day) {
    this.setState({
      selectedToDay: this.convertToUTC(day),
    });
  }

  convertToUTC(date) {
    if (!date) return;
    let day = date.getUTCDate()+1;
    let month = date.getUTCMonth() + 1;
    let year = date.getUTCFullYear();

    return month + "/" + day + "/" + year;
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
            {this.state.selectedStrategy || "Select Strategy"}
          </button>
          <div className="dropdown-menu" aria-labelledby="strategyDropDown">
            {this.state.strategies.map((strat, i) => {
              return (<a key={i} className="dropdown-item" href="#!" onClick={() => this._setSelectedStrategy(strat.strategy_name)}>{strat.strategy_name}</a>);
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
                <th>Execution ID</th>
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
        <Button onClick={() => this._findSelectedStocks()}>Run</Button>
      </div>
    )
  }

  _findSelectedStocks = () => {
    axios
      .post(`${baseAPI}stocks/range/`, {
        dateFrom: this.state.selectedFromDay,
        dateTo: this.state.selectedToDay,
      })
      .then(response => this.setState({ result: response.data }))
      .catch(error => console.log(error));

      console.log(this.state.result)
  }

  _setSelectedStrategy = (name) => {
    this.setState({
      selectedStrategy: name,
    });
  }
}