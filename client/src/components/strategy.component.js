import React, { Component } from 'react';
import axios from 'axios';
import { baseAPI } from './constant'

const StratList = props => (
  <tr onClick={() => console.log(`${props.item.strategy_id} is clicked`)}>
    <td> {props.item.strategy_id} </td>
    <td> {props.item.strategy_name} </td>
    <td> {props.item.strategy_buy} </td>
    <td> {props.item.strategy_sell} </td>
  </tr>
);
export default class Strategy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      strategyList: [],
      error: '',
      buyStrategy: '',
      sellStrategy: '',
    };
  }

  componentDidMount() {
    this.fetchStrategyList();
  }

  render() {
    return (
      <div className="container-fluid">
        {this.renderStrategyForm()}
        {this.renderFormActions()}
        {this.renderStrategyList()}
      </div>
    );
  }

  addStrategy() {
    const strat = {
      strategy_id: 1,
      strategy_name: 'Sample',
      strategy_buy: this.state.buyStrategy,
      strategy_sell: this.state.sellStrategy,
    };

    axios
      .post('http://localhost:4000/strategy/add', strat)
      .then(() => {
        // this.setState({ uploadSuccessful: true, stocks: [] });

        this.fetchStrategyList();
        this.mapStrategyToList();
      })
      .catch(() => this.setState({ uploadFailed: true }));
  }

  fetchStrategyList() {
    axios
      .get(`${baseAPI}strategy/`)
      .then(response => {
        this.setState({ strategyList: response.data })
      })
      .catch(error => this.setState({ error: error }));
  }

  handleBuyInputChange = e => {
    this.setState({ buyStrategy: e.target.value });
  }

  handleSellInputChange = e => {
    this.setState({ sellStrategy: e.target.value });
  }

  mapStrategyToList() {
    return this.state.strategyList.map((strat, i) => {
      return <StratList item={strat} key={i} />;
    });
  }

  renderBuyInput() {
    return (
      <div className="col-lg">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">BUY Strategy</span>
          </div>
          <textarea className="form-control" id="buy-input" aria-label="BUY Strategy" rows="10" onChange={this.handleBuyInputChange}></textarea>
        </div>
      </div>
    );
  }

  renderFormActions() {
    return (
      <div className="form-actions">
        <button className="btn btn-primary" id="btnSaveStrat" onClick={this.addStrategy.bind(this)}>Save</button>
        <button className="btn btn-secondary" id="btnCancelStrat">Cancel</button>
      </div>
    );
  }

  renderSellInput() {
    return (
      <div className="col-lg">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">SELL Strategy</span>
          </div>
          <textarea className="form-control" id="sell-input" aria-label="SELL Strategy" rows="10" onChange={this.handleSellInputChange}></textarea>
        </div>
      </div>
    );
  }

  renderStrategyForm() {
    return (
      <div className="row strategy-form">
        {this.renderBuyInput()}
        {this.renderSellInput()}
      </div>
    );
  }

  renderStrategyList() {
    return (
      <div id="strategyList">
        <table className="table table-striped table-light">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Buy Signal</th>
              <th>Sell Signal</th>
            </tr>
          </thead>
          <tbody>
            {this.mapStrategyToList()}
          </tbody>
        </table>
      </div>
    );
  }


}
