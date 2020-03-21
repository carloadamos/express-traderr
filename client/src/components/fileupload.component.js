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
        <div className="input-group mb-3" id="jsonUploadForm">
          <div className="custom-file">
            <input type="file" id="jsonFileUploader" onChange={this.props.onFileChange} accept=".json" />
            <label className="custom-file-label" htmlFor="jsonFileUploader">Choose a file</label>
          </div>
          <button className="btn btn-primary" type="button" onClick={this.props.onSave}>
            Save
          </button>
        </div>
      </div>
    );
  }
}
