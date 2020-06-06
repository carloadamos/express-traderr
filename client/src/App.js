import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dashboard from "./components/dashboard.component";
import Strategy from "./components/strategy/strategy.component";
import Stocks from "./components/stocklist/stocks.component";
import Backtest from "./components/backtest.component";
import TestRunner from "./components/runner/test-runner.component";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="body-container">
          {this.renderSideNavigation()}
          {this.renderContentArea()}
        </div>
      </Router>
    );
  }

  renderTopHeader() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark" id="topbar">
        </nav>
      </div>
    );
  }
  renderSideNavigation() {
    return (
      <div>
        <nav className="navbar" id="topbar left">
        </nav>
        <nav id="sidebar">
          <div id="user">
            <img src={require("./avatar.png")} alt="Avatar" />
            <span>Carlo</span>
          </div>
          <ul>
            <li>
              <Link to="/runner" className="nav-link star" id="newBacktest" onClick={this.resetActiveElements}>
                <span className="title">New Backtest</span>
                <i className="fas fa-plus fa-fw"></i>
              </Link>
            </li>
            <li>
              <Link to="/" className="nav-link" id="dashBoard" onClick={this.setToActive}>
                <i className="fas fa-chart-pie fa-fw"></i>
                <span className="title">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/stocks" className="nav-link" id="stockList" onClick={this.setToActive}>
                <i className="fas fa-chart-line fa-fw"></i>
                <span className="title">Stocks</span>
              </Link>
            </li>
            <li>
              <Link to="/strategy" className="nav-link" id="strategy" onClick={this.setToActive}>
                <i className="fas fa-lightbulb fa-fw"></i>
                <span className="title">Strategy</span>
              </Link>
            </li>
            <li>
              <Link to="/backtest" className="nav-link" id="backTest" onClick={this.setToActive}>
                <i className="fas fa-vials fa-fw"></i>
                <span className="title">Backtests</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }

  setToActive(event) {
    const activeElements = document.getElementsByClassName('active');
    
    if (activeElements.length >= 1) {
      document.getElementsByClassName('active')[0].classList.remove('active');
    }
    event.currentTarget.classList.add('active');
  }

  resetActiveElements() {
    const activeElements = document.getElementsByClassName('active');

    if (activeElements.length > 0) {
      document.getElementsByClassName('active')[0].classList.remove('active');
    }
  }

  renderContentArea() {
    return (
      <div id="content">
        {this.renderTopHeader()}
        <div id="body" className="container-fluid">
          <Route path="/" exact component={Dashboard} />
          <Route path="/strategy" exact component={Strategy} />
          <Route path="/stocks" exact component={Stocks} />
          <Route path="/backtest" exact component={Backtest} />
          <Route path="/runner" exact component={TestRunner} />
        </div>
      </div>
    );
  }
}
