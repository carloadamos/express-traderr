import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Strategy from './strategy.component';
import { baseAPI } from "../constant";
import Button from 'react-bootstrap/Button';
import axios from "axios";

const StratList = props => (
  <tr onClick={() => console.log(`${props.item.strategy_id} is clicked`)}>
    <td> {props.item.strategy_id} </td>
    <td> {props.item.strategy_name} </td>
    <td> {props.item.strategy_buy} </td>
    <td> {props.item.strategy_sell} </td>
  </tr>
);

export default class StrategyList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      strategyList: [],
      error: "",
      buyStrategy: "",
      sellStrategy: ""
    };
  }

  componentDidMount() {
    this.fetchStrategyList();
  }

  render() {
    return (
      <Router>
        <div>
          <Link to="/strategy">
            <Button variant="primary">New Strategy</Button>
            {this.renderRouteArea()}
            {}
          </Link>
        </div>
      </Router>
    );
  }

  addStrategy() {
    const strat = {
      strategy_id: 1,
      strategy_name: "Sample",
      strategy_buy: this.state.buyStrategy,
      strategy_sell: this.state.sellStrategy
    };

    axios
      .post("http://localhost:4000/strategy/add", strat)
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
        this.setState({ strategyList: response.data });
      })
      .catch(error => this.setState({ error: error }));
  }

  handleBuyInputChange = e => {
    this.setState({ buyStrategy: e.target.value });
  };

  handleSellInputChange = e => {
    this.setState({ sellStrategy: e.target.value });
  };

  mapStrategyToList() {
    return this.state.strategyList.map((strat, i) => {
      return <StratList item={strat} key={i} />;
    });
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
          <tbody>{this.mapStrategyToList()}</tbody>
        </table>
      </div>
    );
  }

  renderRouteArea() {
    return (
      <div id="newStrategy">
        {this.renderStrategyList()}
        <Route path="/strategy" exact component={Strategy} />
      </div>
    );
  }
}
