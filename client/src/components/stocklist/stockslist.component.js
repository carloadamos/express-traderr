// React
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Components
import TraderDatepicker from '../../library/trader-datepicker/trader-datepicker.component'
import Button from "react-bootstrap/Button";

// Constant
import { baseAPI } from "../../constant"

// Styles 
import './style.css'

// Packages
import moment from 'moment';

/**
 * @class StockList 
 * @extends Component
 */
export default class StocksList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fromDay: undefined,
      toDay: undefined,
      error: "",
      selectedStock: undefined,
      stocks: [],
      stockList: [],
      uploadSuccessful: false,
      uploadFailed: false
    };
  }

  componentDidMount() {
    this.retrieveStocks();
  }

  retrieveStocks() {
    axios
      .post(`${baseAPI}stocks/distinct/`)
      .then(response => this.setState({ stockList: response.data }))
      .catch(error => console.error(error));
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
              <Button id="slSearchBtn" onClick={() => this.searchStocks()}>Search</Button>
              <Button id="slResetBtn">Reset</Button>
            </div>
          </div>
        </div>
        {this.state.stocks.length !== 0 && (
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

  searchStocks = () => {
    const code = this.state.selectedStock;
    this.setState({ stocks: [] }, () => {
      axios
        .post("http://localhost:4000/stocks/range", {
          dateFrom: this.state.fromDay,
          dateTo: this.state.toDay,
          code
        })
        .then((response) => {
          this.setState({ stocks: response.data });

          this.mapStockList();
        })
        .catch(() => this.setState({ uploadFailed: true }));

    });
  }

  onFileChangeHandler = (content) => {
    this.setState({ stockList: content });
  };

  onSaveHandler = () => {
    axios
      .post("http://localhost:4000/stocks/add", this.state.stockList)
      .then(() => {
        this.setState({ uploadSuccessful: true, stocks: [] });

        this.mapStockList();
      })
      .catch(() => this.setState({ uploadFailed: true }));
  };

  mapStockList() {
    return this.state.stocks.map((currentStock, i) => {
      return (
        <tr key={i}>
          <td> {currentStock.code} </td>
          <td> {moment(currentStock.trade_date).format('MMM DD, YYYY')} </td>
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
            {this.state.selectedStock ? this.state.selectedStock : "ALL"}
          </button>
          <div className="dropdown-menu" aria-labelledby="strategyDropDown">
            {this.state.stockList.map((stock, i) => {
              return (<a key={i} className="dropdown-item" onClick={() => this._setSelectedStock(stock)}>{stock}</a>);
            })}
          </div>
        </div>
      </div>
    );
  }

  _setSelectedStock(stock) {
    this.setState({ selectedStock: stock });
  }

  _renderFromDatePicker() {
    return (
      <TraderDatepicker label="Date From" onDayChange={this.handleFromDayChange} />
    );
  }

  handleFromDayChange = (day) => {
    if (day) {
      console.log('fromday', new Date(day).toISOString())
      this.setState({ fromDay: day });
    }
  }

  _renderToDatePicker() {
    return (
      <TraderDatepicker label="Date To" onDayChange={this.handleToDayChange} />
    );
  }

  handleToDayChange = (day) => {
    this.setState({ toDay: day });
  }
}
