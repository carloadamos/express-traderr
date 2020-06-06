import React, { Component } from "react";
import { Link } from "react-router-dom";
import TraderUploader from '../../library/trader-uploader/trader-uploader.component';
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class StocksUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stocks: [],
    };
  }
  render() {
    return (
      <div>
        <div className="header">
          <Link to="/stocks/list" className="nav-normal">
            <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>
            <span> STOCKS</span>
          </Link>
          <p>UPLOAD STOCKS</p>
        </div>
        <div className="card">
          <div className="upload-controls">
            <div className="stocks-list-uploader">
              <TraderUploader
                label="Choose a file"
                // onActionTriggered={this.onSaveHandler}
                onFileChange={this.onFileChangeHandler}
              />
            </div>
            <Button id="slSearchBtn" onClick={() => this.onSaveHandler()}>Upload</Button>
            <Button id="slResetBtn">Reset</Button>
          </div>
        </div>
        <div>
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
      </div>
    );
  }

  onSaveHandler = () => {
    axios
      .post("http://localhost:4000/stocks/add", this.state.stocks)
      .then(() => {
        this.setState({ uploadSuccessful: true, stocks: [] });

        this.mapStockList();
      })
      .catch(() => this.setState({ uploadFailed: true }));
  };

  onFileChangeHandler = (content) => {
    this.setState({ stocks: content });
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
}
