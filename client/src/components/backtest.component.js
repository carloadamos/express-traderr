import React, { Component } from "react";

export default class Backtest extends Component {
  constructor() {
    super();

    this.state = {
      selected: "",
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

  _renderDatePicker() {
    return (
      <div id="backtestDatepicker"> Datepicker </div>
    );
  }
}
