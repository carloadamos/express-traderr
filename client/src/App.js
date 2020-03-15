import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/dashboard.component';
import Strategy from './components/strategy.component';
import StockList from './components/stockslist.component';
import Backtest from './components/backtest.component';

import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="body-container">
          <nav className="side-bar">
            <ul>
              <li>
                <Link to="/" className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/strategy" className="nav-link">
                  Strategy
                </Link>
              </li>
              <li>
                <Link to="/stocklist" className="nav-link">
                  Stock List
                </Link>
              </li>
              <li>
                <Link to="/backtest" className="nav-link">
                  Backtest
                </Link>
              </li>
            </ul>
          </nav>

          <Route path="/" exact component={Dashboard} />
          <Route path="/strategy" exact component={Strategy} />
          <Route path="/stocklist" exact component={StockList} />
          <Route path="/backtest" exact component={Backtest} />
        </div>
      </Router>
    );
  }
}
