import React, { Component } from "react";

export default class Backtest extends Component {
  render() {
    return (
      <div>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown button
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="#!">Action</a>
            <a className="dropdown-item" href="#!">Another action</a>
            <a className="dropdown-item" href="#!">Something else here</a>
          </div>
        </div>
      </div>
    );
  }
}
