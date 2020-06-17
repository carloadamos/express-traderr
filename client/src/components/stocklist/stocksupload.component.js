import React, { Component } from "react";
import { Link } from "react-router-dom";
import TraderUploader from '../../library/trader-uploader/trader-uploader.component';
import Button from "react-bootstrap/Button";
import axios from "axios";

const LABELS = Object.freeze({
  RESET: 'RESET',
  STOCKS: 'STOCKS',
  TOTAL_COUNT: 'TOTAL COUNT',
  UPLOAD: 'Upload',
  UPLOAD_STOCKS: 'UPLOAD STOCKS',
});

export default class StocksUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stocks: [],
      saving: false,
    };
  }

  render() {
    return (
      <div>
        <div className="header">
          <Link to="/stocks/list" className="nav-normal">
            <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>
            <span> {LABELS.STOCKS}</span>
          </Link>
          <p>{LABELS.UPLOAD_STOCKS}</p>
        </div>
        <div className="card">
          <div className="upload-controls">
            <div className="stocks-list-uploader">
              <TraderUploader
                label="Choose a file"
                preProcess={this.clearStockList}
                onFileChange={this.onFileChangeHandler}
                parseType="csv"
              />
            </div>
            <Button id="slSearchBtn" onClick={() => this.onSaveHandler()}>
              {this.state.saving
                ? this.renderLoadingButton()
                : LABELS.UPLOAD
              }</Button>
            <Button id="slResetBtn">Reset</Button>
          </div>
        </div>
        <div>
          {this.state.stocks.length !== 0 && (
            <div className="table-responsive stock-list">
              {LABELS.TOTAL_COUNT} {this.state.stocks.length}
              {JSON.stringify(this.state.stocks[1447])}
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
      </div>
    );
  }

  clearStockList = () => {
    this.setState({ stocks: [] });
  }

  renderLoadingButton() {
    return (
      <span className="buttonLabel">
        Loading
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      </span>
    )
  }

  onSaveHandler = () => {
    this.toggleSavingState();
    axios
      .post("http://localhost:4000/stocks/add", this.state.stocks)
      .then(() => {
        this.setState({ uploadSuccessful: true, stocks: [] });

        this.mapStockList();
      })
      .catch(() => this.setState({ uploadFailed: true }))
      .finally(() => this.toggleSavingState());
  };

  onFileChangeHandler = (content) => {
    this.setState({ stocks: [] }, () => {
      this.setState({ stocks: content });
    });
  };

  toggleSavingState = () => {
    this.setState({ saving: !this.state.saving });
  }

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
}
