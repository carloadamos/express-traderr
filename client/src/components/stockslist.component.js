import React, { Component } from "react";
import axios from "axios";
import FileUpload from "./fileupload.component";
import { baseAPI } from "./constant";

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
        <div class="upload-card">
          <FileUpload
            actionLabel="Upload File"
            onActionTriggered={this.onSaveHandler}
            onFileChange={this.onFileChangeHandler}
          />
          {this.state.uploadSuccessful && (
            <p className="success">Upload successful!</p>
          )}
          {this.state.uploadFailed && <p className="fail">Upload failed!</p>}
        </div>
        {this.state.stocks.length === 0 ? (
          <h1>No data</h1>
        ) : (
            <table className="table table-striped" style={{ marginTop: 20 }}>
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
          <td> {currentStock.stock_code} </td>
          <td> {currentStock.stock_trade_date} </td>
          <td> {currentStock.stock_open} </td>
          <td> {currentStock.stock_high} </td>
          <td> {currentStock.stock_low} </td>
          <td> {currentStock.stock_close} </td>
          <td> {currentStock.stock_volume} </td>
        </tr>
      );
    });
  }
}
