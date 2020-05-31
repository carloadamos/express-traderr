import React, { Component } from "react";
import '../../style/testrunner.style.css'
import TraderDatepicker from '../../library/trader-datepicker/trader-datepicker.component';
import TraderTextField from '../../library/trader-textfield/trader-textfield.component';
import 'react-day-picker/lib/style.css';
import Button from "react-bootstrap/Button";

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
            <Button id="trSearchBtn">Search</Button>
            <Button id="trResetBtn">Reset</Button>
          </div>
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
      <TraderTextField label="Stoploss" />
    )
  }
}

