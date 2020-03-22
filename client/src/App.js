import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/dashboard.component";
import Strategy from "./components/strategy.component";
import StockList from "./components/stockslist.component";
import Backtest from "./components/backtest.component";

import "./App.css";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      title: "Dashboard"
    };
  }

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

  renderSideNavigation() {
    return (
      <nav id="sidebar">
        <div className="sidebar-header">
          <h4>Traderr</h4>
          <h1>ET</h1>
        </div>

        <ul>
          <li onClick={() => this.setTitle("Dashboard")}>
            <Link to="/" className="nav-link" id="dashBoard">
              <i className="fas fa-columns"></i>
              <span className="title">Dashboard</span>
            </Link>
          </li>
          <li onClick={() => this.setTitle("Strategy")}>
            <Link to="/strategy" className="nav-link" id="strategy">
              <i className="fas fa-chess-king"></i>
              <span className="title">Strategy</span>
            </Link>
          </li>
          <li onClick={() => this.setTitle("Stocks")}>
            <Link to="/stocklist" className="nav-link" id="stockList">
              <i className="fas fa-chart-bar"></i>
              <span className="title">Stock List</span>
            </Link>
          </li>
          <li onClick={() => this.setTitle("Backtest")}>
            <Link to="/backtest" className="nav-link" id="backTest">
              <i className="fas fa-vial"></i>
              <span className="title">Backtest</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  renderContentArea() {
    return (
      <div id="content">
        <nav className="navbar navbar-expand-lg navbar-dark" id="topbar">
          <h1>{this.state.title}</h1>
          <img src={require("./avatar.png")} alt="Avatar"/>
        </nav>
        <div id="body" className="container-fluid">
          <Route path="/" exact component={Dashboard} />
          <Route path="/strategy" exact component={Strategy} />
          <Route path="/stocklist" exact component={StockList} />
          <Route path="/backtest" exact component={Backtest} />
        </div>
      </div>
    );
  }

  setTitle(name) {
    this.setState({ title: name });
  }
}
