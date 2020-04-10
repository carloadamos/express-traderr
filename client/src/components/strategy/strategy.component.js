import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import StrategyList from './strategy-list.component';
import StrategyAdd from './strategy-add.component';
import Breadcrumb from '../breadcrumbs.component';

const items = [
  { to: '/strategy/list', label: 'Strategy List' },
  { to: '/strategy/add', label: 'Add Strategy' },
]

export default class Strategy extends Component {
  render() {
    return (
      <Router>
        {this.renderRouteArea()}
      </Router>
    );
  }

  renderRouteArea() {
    return (
      <div id="strategy">
        <Breadcrumb>
          {items.map(({ to, label }) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}
        </Breadcrumb>
        <Route path="/strategy"><Redirect to="/strategy/list"/></Route>
        <Route path="/strategy/list" exact component={StrategyList} />
        <Route path="/strategy/add" exact render={props => <StrategyAdd callMe={this.sampleMethod} />} />
      </div>
    );
  }
}