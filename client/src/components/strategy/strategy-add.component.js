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
      sellStrategy: {},
    }
  }

  render() {
    return (
      <div id="strategyAdd">
        <section id="uploadStrategy">
          {this.renderBuySection()}
          {this.renderSellSection()}
          {this.renderActionSection()}
          {this.renderBuyContent()}
        </section> </div>
    );
  }

  /**
   * Render buy section.
   */
  renderBuySection() {
    return (
      <section>
        <h5>Buy</h5>
        <FileUpload
          actionLabel="Validate"
          onActionTriggered={this.onBuyValidate}
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
      <section>
        <h5>Sell</h5>
        <FileUpload
          actionLabel="Validate"
          onActionTriggered={this.onSellValidate}
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

  onBuyValidate = () => {
    console.log('Buy Validate');
  }

  onSellValidate = () => {
    console.log('Sell Validate');
  }

  onSellFileChange = (content) => {
    console.log('sell', content)
    this.setState({
      sellStrategy: content,
    });
  }

  renderActionSection() {
    return (
      <section id="action">
        <Button >Save</Button>
        <Button >Reset</Button>
      </section>
    )
  }

  renderBuyContent() {
    return (
      this.state.buyStrategy &&
      <JSONPretty data={this.state.buyStrategy} />
    );
  }
}