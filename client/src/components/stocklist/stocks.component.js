import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect  } from "react-router-dom";
import StocksList from './stockslist.component'
import StocksUpload from './stocksupload.component'

export default class Stocks extends Component {
  render() {
    return (
      <Router>
        {this.renderRouteArea()}
      </Router>
    );
  }

  renderRouteArea() {
    return (
      <div id="stocks">
        <Route path="/stocks"><Redirect to="/stocks/list" /></Route>
        <Route path="/stocks/list" exact component={StocksList} />
        <Route path="/stocks/upload" exact component={StocksUpload} />
      </div>
    );
  }
}