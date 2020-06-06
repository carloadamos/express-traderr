import React, { Component } from "react";
import axios from "axios";
import TraderDatepicker from '../../library/trader-datepicker/trader-datepicker.component'
import Button from "react-bootstrap/Button";
import './style.css'
import { baseAPI } from "../../constant"
import { Link } from "react-router-dom";

export default class StocksList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      stocks: [],
      stockList: [],
      uploadSuccessful: false,
      uploadFailed: false
    };
  }

  componentDidMount() {
    this.retrieveStockList();
  }

  retrieveStockList() {
    axios
      .get(`${baseAPI}stocks/`)
      .then(response => this.setState({ stocks: response.data }))
      .catch(error => this.setState({ error: error }));
  }

  render() {
    return (
      <div>
        <div className="header">
          <p>STOCKS</p>
        </div>
        <div className="stockSearch">
          <div id="uploadBtn">
            <Link to="/stocks/upload" className="nav-normal">
              <i className="fa fa-cloud" aria-hidden="true"></i>
              <span>Upload</span>
            </Link>
          </div>
          <div className="card">
            <div className="testRunnerFields">
              {this._renderSelectStock()}
              {this._renderFromDatePicker()}
              {this._renderToDatePicker()}
              <Button id="slSearchBtn">Search</Button>
              <Button id="slResetBtn">Reset</Button>
            </div>
          </div>
        </div>
        {this.state.stocks.length === 0 ? (
          <h1>No data</h1>
        ) : (
            <div className="table-responsive stock-list">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Stock Code</th>
                    <th>Date</th>
                    <th>Open</th>
                    <th>High</th>
                    <th>Low</th>
                    <th>Close</th>
                    <th>Volume</th>
                  </tr>
                </thead>
                <tbody>{this.mapStockList()}</tbody>
              </table>
            </div>
          )}
      </div>
    );
  }

  onFileChangeHandler = (content) => {
    this.setState({ stockList: content });
  };

  onSaveHandler = () => {
    axios
      .post("http://localhost:4000/stocks/add", this.state.stockList)
      .then(() => {
        this.setState({ uploadSuccessful: true, stocks: [] });

        this.retrieveStockList();
        this.mapStockList();
      })
      .catch(() => this.setState({ uploadFailed: true }));
  };

  mapStockList() {
    return this.state.stocks.map((currentStock, i) => {
      return (
        <tr key={i}>
          <td> {currentStock.code} </td>
          <td> {currentStock.trade_date} </td>
          <td> {currentStock.open} </td>
          <td> {currentStock.high} </td>
          <td> {currentStock.low} </td>
          <td> {currentStock.close} </td>
          <td> {currentStock.volume} </td>
        </tr>
      );
    });
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

  _renderFromDatePicker() {
    return (
      <TraderDatepicker label="Date From" />
    );
  }

  _renderToDatePicker() {
    return (
      <TraderDatepicker label="Date To" />
    );
  }
}
