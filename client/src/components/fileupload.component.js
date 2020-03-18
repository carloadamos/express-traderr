import React, { Component } from 'react';

export default class Fileupload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stockList: [],
    };
  }

  render() {
    return (
      <div>
        <input type="file" name="file" onChange={this.props.onFileChange}></input>
        <button type="button" onClick={this.props.onSave}>
          Save
        </button>
      </div>
    );
  }
}
