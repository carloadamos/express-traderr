import React, { Component } from "react";
import axios from "axios";
import Fileupload from "./fileupload.component";
import { baseAPI } from "./constant";

let fileReader;

export default class StocksList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      fileLabel: "Choose a file",
      hasChosenFile: false,
      message: "",
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
        <div id="uploadHead">
          <Fileupload
            hasChosen={this.state.hasChosenFile}
            label={this.state.fileLabel}
            onFileChange={this.onFileChangeHandler}
            onSave={this.onSaveHandler}
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

  onFileChangeHandler = e => {
    const uploadedFile = e.target.files[0];

    if (uploadedFile) {
      this.setLabel(uploadedFile.name);
      this.setChosen();
      fileReader = new FileReader();
      fileReader.onloadend = this.handleFileRead;
      fileReader.readAsText(uploadedFile);
    }
  };

  onSaveHandler = () => {
    if (!this.state.hasChosenFile) {
      this.setLabel();
    }
    this.reset();
    axios
      .post("http://localhost:4000/stocks/add", this.state.stockList)
      .then(() => {
        this.setState({ uploadSuccessful: true, stocks: [] });

        this.retrieveStockList();
        this.mapStockList();
      })
      .catch(() => this.setState({ uploadFailed: true }));
  };

  handleFileRead = e => {
    const content = JSON.parse(fileReader.result);

    this.setState({
      stockList: content
    });
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

  reset() {
    this.setState({
      uploadSuccessful: false,
      uploadFailed: false,
      hasChosenFile: false,
      fileLabel: "Choose a file"
    });
  }

  setChosen() {
    this.setState({ hasChosenFile: true });
  }

  setLabel(fileName) {
    this.setState({ fileLabel: fileName });
  }
}
