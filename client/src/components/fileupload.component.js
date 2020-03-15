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
        <p>File uploader here</p>
        <input type="file" name="file" onChange={this.props.onFileChange}></input>
        <button type="button" onClick={this.props.onSave}>
          Save
        </button>
        {/* {this.state.success && <p className="success">File saved successfully</p>}
        {this.state.fail && <p className="fail">File not saved</p>} */}
      </div>
    );
  }
}
