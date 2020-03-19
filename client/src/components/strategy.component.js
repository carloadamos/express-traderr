import React, { Component } from 'react';

export default class Strategy extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row strategy-form">
          <div className="col-lg">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">BUY Strategy</span>
              </div>
              <textarea className="form-control" id="buy-input" aria-label="BUY Strategy"></textarea>
            </div>
          </div>
          <div className="col-lg">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">SELL Strategy</span>
              </div>
              <textarea className="form-control" id="sell-input" aria-label="SELL Strategy"></textarea>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button className="btn btn-primary" id="btnSaveStrat">Save</button>
          <button className="btn btn-secondary" id="btnCancelStrat">Cancel</button>
        </div>

      </div>
    );
  }
}
