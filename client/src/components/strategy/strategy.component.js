import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import StrategyList from './strategy-list.component';
import StrategyAdd from './strategy-add.component';
import Button from 'react-bootstrap/Button';

export default class Strategy extends Component {
  render() {
    return (
      <Router>
        <Link to="/strategy">
          <Button variant="primary">Strategy List</Button>
        </Link>
        <Link to="/strategy/add">
          <Button variant="primary">New Strategy</Button>
        </Link>
        {this.renderRouteArea()}
      </Router>
    );
  }

  renderRouteArea() {
    return (
      <div id="strategy">
        <Route path="/strategy" exact component={StrategyList} />
        <Route path="/strategy/add" exact component={StrategyAdd} />
      </div>
    );
  }
}