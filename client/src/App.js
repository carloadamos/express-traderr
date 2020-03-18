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
          <nav id="sidebar" className="bg-dark">
            <div className="sidebar-header">
              <h3>Express-Traderr</h3>
              <h1>ET</h1>
            </div>

            <ul>
              <li>
                <Link to="/" className="nav-link" id="dashBoard" >
                  <i className="fas fa-home"></i>
                  <span className="title">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/strategy" className="nav-link" id="strategy">
                  <i className="fas fa-chess-king"></i>
                  <span className="title">Strategy</span>
                </Link>
              </li>
              <li>
                <Link to="/stocklist" className="nav-link" id="stockList">
                  <i className="fas fa-chart-bar"></i>
                  <span className="title">Stock List</span>
                </Link>
              </li>
              <li>
                <Link to="/backtest" className="nav-link" id="backTest">
                  <i className="fas fa-vial"></i>
                  <span className="title">Backtest</span>
                </Link>
              </li>
            </ul>

          </nav>
          <div id="content">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <button className="btn btn-dark" id="sidebarCollapse">Toggle Sidebar</button>
            </nav>
            <Route path="/" exact component={Dashboard} />
            <Route path="/strategy" exact component={Strategy} />
            <Route path="/stocklist" exact component={StockList} />
            <Route path="/backtest" exact component={Backtest} />
          </div>
        </div>
      </Router >
    );
  }
}
