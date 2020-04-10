import React, { Component } from "react";
import FileUpload from '../fileupload.component';
import Button from 'react-bootstrap/Button';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

export default class StrategyAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buyStrategy: undefined,
      sellStrategy: undefined,
    }
  }

  render() {
    return (
      <div id="strategyAdd">
        <section id="uploadForm">
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

  /**
   * Render buy section.
   */
  renderBuySection() {
    return (
      <section className="card upload-card">
        <h5>Buy</h5>
        <FileUpload
          onFileChange={this.onBuyFileChange}
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
        <FileUpload
          onFileChange={this.onSellFileChange}
        />
      </section>
    )
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
        <Button className="form-btn">Save</Button>
        <Button className="form-btn">Reset</Button>
      </section>
    )
  }

  renderBuyContent() {
    return (
      this.state.buyStrategy &&
      (
        <section className="card">
          <JSONPretty data={this.state.buyStrategy} />
        </section>
      )
    );
  }

  renderSellContent() {
    return (
      this.state.sellStrategy &&
      (
        <section className="card">
          <JSONPretty data={this.state.sellStrategy} />
        </section>
      )

    );
  }
}