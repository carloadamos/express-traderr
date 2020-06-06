import React, { Component } from "react";
import './style.css'

export default class TraderTextField extends Component {
  render() {
    return (
      <div id="trader-textfield">
        <span>{this.props.label}</span>
        <input type="text" onChange={this.props.onChange}></input>
      </div>
    );
  }
}