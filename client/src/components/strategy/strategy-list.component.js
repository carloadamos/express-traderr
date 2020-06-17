import React, { Component } from "react";
import axios from "axios";
import { baseAPI } from "../../constant"
import JSONPretty from 'react-json-pretty';

const StratList = props => (
  <tr onClick={() => console.log(`${props.key} is clicked`)}>
    <td> {props.item.strategy_name} </td>
    <td> <JSONPretty data={props.item.strategy_buy} />} </td>
    <td> <JSONPretty data={props.item.strategy_sell} />} </td>
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
      this.renderStrategyList()
    );
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
        <div className="card">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Buy Signal</th>
                  <th>Sell Signal</th>
                </tr>
              </thead>
              <tbody>{this.mapStrategyToList()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
