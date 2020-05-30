import React, { Component } from "react";
import '../../style/testrunner.style.css'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import TraderDatepicker from '../../library/trader-datepicker/trader-datepicker.component';
import 'react-day-picker/lib/style.css';

export default class TestRunner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stockList: ['ALI', 'NOW', 'BDO'],
      datePickerOpen: false,
    };

    this.datePickerRef = React.createRef();
  }

  render() {
    return (
      <div>
        <div className="header">
          <p>LABORATORY</p>
        </div>
        <div className="card">
          {this._renderFromDatePicker()}
          {this._renderToDatePicker()}
          {this._renderSelectStock()}
          {this._renderSelectStrategy()}
          {this._renderStopLoss()}
        </div>
      </div>
    );

  }
  _renderSelectStock() {
    return (
      <div id="tsStockDd">
        <span>Stock</span>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            ALL
          </button>
          <div className="dropdown-menu" aria-labelledby="strategyDropDown">
            {this.state.stockList.map((stock, i) => {
              return (<a key={i} className="dropdown-item" href="#!" onClick={() => console.log(`You clicked ${stock}`)}>{stock}</a>);
            })}
          </div>
        </div>
      </div>
    );
  }

  _renderSelectStrategy() {
    return (
      <div id="tsStratDd">
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
            {this.state.stockList.map((stock, i) => {
              return (<a key={i} className="dropdown-item" href="#!" onClick={() => console.log(`You clicked ${stock}`)}>{stock}</a>);
            })}
          </div>
        </div>
      </div>
    );
  }

  _renderFromDatePicker() {
    return (
      <TraderDatepicker label="From" />
    );
  }

  _renderToDatePicker() {
    return (
      <TraderDatepicker label="To" />
    );
  }

  _renderStopLoss() {
    return (
      <div className="formTextField">
        <span>Stoploss</span>
        <input type="text"></input>
      </div>
    )
  }
}

