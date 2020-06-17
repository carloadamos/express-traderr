import React, { Component } from "react";
import TraderUploader from '../../library/trader-uploader/trader-uploader.component';
import Button from 'react-bootstrap/Button';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';
import axios from "axios";

export default class StrategyAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      strategyName: undefined,
      buyStrategy: undefined,
      sellStrategy: undefined,
    }
  }

  render() {
    return (
      <div id="strategyAdd">
        <section id="uploadForm">
          {this.renderFileNameInput()}
          {this.renderBuySection()}
          {this.renderSellSection()}
        </section>
        <section id="strategyContent">
          {this.renderActionSection()}
          {this.renderBuyContent()}
          {this.renderSellContent()}
        </section>
      </div>
    );
  }

  renderFileNameInput() {
    return (
      <section className="card upload-card">
        <h5>Strategy name</h5>
        <input type="text" id="strategyName" onChange={this.setFileName}></input>
      </section>
    );
  }

  /**
   * Render buy section.
   */
  renderBuySection() {
    return (
      <section className="card upload-card">
        <h5>Buy</h5>
        <TraderUploader
          onFileChange={this.onBuyFileChange}
          label="Choose buy strategy file"
          parseType="json"
        />
      </section>
    )
  }

  /**
   * Render sell section.
   */
  renderSellSection() {
    return (
      <section className="card upload-card">
        <h5>Sell</h5>
        <TraderUploader
          onFileChange={this.onSellFileChange}
          label="Choose sell strategy file"
          parseType="json"
        />
      </section>
    )
  }

  setFileName = e => {
    this.setState({
      strategyName: e.target.value
    });
  }

  onBuyFileChange = (content) => {
    this.setState({
      buyStrategy: content,
    });
  }

  onSellFileChange = (content) => {
    this.setState({
      sellStrategy: content,
    });
  }

  renderActionSection() {
    return (
      <section id="action">
        <Button className="form-btn" onClick={this.saveStrategy}>Save</Button>
        <Button className="form-btn">Reset</Button>
      </section>
    )
  }

  renderBuyContent() {
    return (
      this.state.buyStrategy &&
      (
        <div>
          <h5>Buy Strategy</h5>
          <section className="card">
            <JSONPretty data={this.state.buyStrategy} />
          </section>
        </div>
      )
    );
  }

  renderSellContent() {
    return (
      this.state.sellStrategy &&
      (
        <div>
          <h5>Sell Strategy</h5>
          <section className="card">
            <JSONPretty data={this.state.sellStrategy} />
          </section>
        </div>
      )

    );
  }

  saveStrategy = () => {
    const strategy = {
      strategy_name: this.state.strategyName,
      strategy_buy: this.state.buyStrategy,
      strategy_sell: this.state.sellStrategy,
    };

    axios
      .post("http://localhost:4000/strategy/add", strategy)
      .then(() => {
        console.log('Upload successful!')
      })
      .catch(() => console.log('Upload failed!'));
  }
}