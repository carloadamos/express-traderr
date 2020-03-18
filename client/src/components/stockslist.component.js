import React, { Component } from 'react';
import axios from 'axios';
import Fileupload from './fileupload.component';

const Stock = props => (
  <tr>
    <td> {props.stock.stock_code} </td>
    <td> {props.stock.stock_trade_date} </td>
    <td> {props.stock.stock_open} </td>
    <td> {props.stock.stock_high} </td>
    <td> {props.stock.stock_low} </td>
    <td> {props.stock.stock_close} </td>
    <td> {props.stock.stock_volume} </td>
  </tr>
);

let fileReader;

export default class StocksList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stocks: [],
      stockList: [],
      uploadSuccessful: false,
      uploadFailed: false,
    };
  }

  componentDidMount() {
    this.retrieveStockList();
  }

  retrieveStockList() {
    axios
      .get('http://localhost:4000/stocks/')
      .then(response => this.setState({ stocks: response.data }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <h3>Stock List</h3>
        {this.state.uploadSuccessful && <h4 className="success">Upload successful!</h4>}
        {this.state.uploadFailed && <h4 className="fail">Upload failed!</h4>}
        <Fileupload onFileChange={this.onFileChangeHandler} onSave={this.onSaveHandler} />
        {this.state.stocks.length === 0 ? (
          <p>No data</p>
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
      fileReader = new FileReader();
      fileReader.onloadend = this.handleFileRead;
      fileReader.readAsText(uploadedFile);
    }
  };

  onSaveHandler = () => {
    axios
      .post('http://localhost:4000/stocks/add', this.state.stockList)
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
      stockList: content,
    });
  };

  mapStockList() {
    return this.state.stocks.map((currentStock, i) => {
      return <Stock stock={currentStock} key={i} />;
    });
  }
}
