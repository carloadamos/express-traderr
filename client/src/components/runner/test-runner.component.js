import React, { Component } from "react";
import '../../style/testrunner.style.css'

export default class TestRunner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stockList: ['ALI', 'NOW', 'BDO'],
    }
  }

  render() {
    return (
      <div>
        <div className="header">
          <p>LABORATORY</p>
        </div>
        <div className="card">
          FROM TO STRATEGY STOPLOSS
          {this._renderSelectStock()}
          {this._renderSelectStrategy()}
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
}

