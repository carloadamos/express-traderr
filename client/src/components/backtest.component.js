import React, { Component } from "react";
// import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker';
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
    };
  }

  render() {
    return (
      <div id="backtest">
        {this._renderDropDown()}
        {this._renderDatePicker()}
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

  handleFromYearMonthChange(month) {
    console.log(month)
    this.setState({ fMonth: month });
  }
  
  handleToYearMonthChange(month) {
    console.log(month)
    this.setState({ tMonth: month });
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
              <p>Please select a day.</p>
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
}

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
