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
        {/* <input type="file" name="file" onChange={this.props.onFileChange}></input>
        <button className="btn btn-dark" type="button" onClick={this.props.onSave}>
          Save
        </button> */}
        <div className="input-group mb-3">
          <div className="custom-file">
            <input type="file" id="jsonFileUploader" onChange={this.props.onFileChange} />
            <label className="custom-file-label" htmlFor="jsonFileUploader">Choose a file</label>
          </div>
          <div className="input-group-append">
            <button className="btn btn-primary" type="button" onClick={this.props.onSave}>
              Save
          </button>
          </div>
        </div>
      </div>
    );
  }
}
