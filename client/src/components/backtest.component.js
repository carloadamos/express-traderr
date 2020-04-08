import React, { Component } from "react";
import DayPickerInput from 'react-day-picker';
import axios from "axios";
import { baseAPI } from "./constant";
import 'react-day-picker/lib/style.css';

export default class Backtest extends Component {
  constructor() {
    super();

    this.handleFromClick = this.handleFromClick.bind(this);
    this.handleToClick = this.handleToClick.bind(this);
    this.handleFromYearMonthChange = this.handleFromYearMonthChange.bind(this);
    this.handleToYearMonthChange = this.handleToYearMonthChange.bind(this);
    this.state = {
      selected: "",
      fromDate: undefined,
      toDate: undefined,
      fMonth: fromMonth,
      tMonth: fromMonth,
      result: [],
      strategies: [],
    };
  }

  componentDidMount() {
    this.retrieveStrategyList();
  }

  render() {
    return (
      <div id="backtest">
        {this._renderDropDown()}
        {this._renderDatePicker()}
        {this._renderResultsTable()}
      </div>
    );
  }

  handleFromYearMonthChange(month) {
    this.setState({ fMonth: month });
  }

  handleToYearMonthChange(month) {
    this.setState({ tMonth: month });
  }

  handleFromClick(day, { selected }) {
    if (selected) {
      this.setState({ fromDate: undefined });
      return;
    }

    this.setState({ fromDate: day });
  }

  handleToClick(day, { selected }) {
    if (selected) {
      this.setState({ toDate: undefined });
      return;
    }

    this.setState({ toDate: day });
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

  _renderDatePicker() {
    return (
      <div id="backtestDatePicker">
        <div id="fromDatePicker">
          <h5>From:</h5>
          <DayPickerInput
            id="fromDate"
            onDayClick={this.handleFromClick}
            selectedDays={this.state.fromDate}
            month={this.state.fMonth}
            fromMonth={fromMonth}
            toMonth={toMonth}
            captionElement={({ date, localeUtils }) => (
              <YearMonthForm
                date={date}
                localeUtils={localeUtils}
                onChange={this.handleFromYearMonthChange}
              />
            )}
          />
          {this.state.fromDate ? (
            <p>You clicked {this.state.fromDate.toLocaleDateString()}</p>
          ) : (
              <p>.</p>
            )}
        </div>
        <div id="fromDatePicker">
          <h5>To:</h5>
          <DayPickerInput
            id="toDate"
            onDayClick={this.handleToClick}
            selectedDays={this.state.toDate}
            month={this.state.tMonth}
            fromMonth={fromMonth}
            toMonth={toMonth}
            captionElement={({ date, localeUtils }) => (
              <YearMonthForm
                date={date}
                localeUtils={localeUtils}
                onChange={this.handleToYearMonthChange}
              />
            )}
          />
          {this.state.toDate ? (
            <p>You clicked {this.state.toDate.toLocaleDateString()}</p>
          ) : (
              <p>Please select a day.</p>
            )}
        </div>
      </div>
    );
  }

  _renderDropDown() {
    return (
      <div id="backtestDropdown">
        <h5>Select Strategy</h5>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="strategyDropDown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Select Strategy
          </button>
          <div className="dropdown-menu" aria-labelledby="strategyDropDown">
            <a className="dropdown-item" href="#!">Macd SMA</a>
            <a className="dropdown-item" href="#!">ALMA</a>
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
}

/** Datepicker selector */
const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear - 10, 0);
const toMonth = new Date(currentYear, 11);

function YearMonthForm({ date, localeUtils, onChange }) {
  const months = localeUtils.getMonths();
  const years = [];

  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <form className="DayPicker-Caption">
      <select id="monthPicker" name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select id="yearPicker" name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </form>
  );
}
