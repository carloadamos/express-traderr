import React, { Component } from "react";

export default class Fileupload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stockList: []
    };

    this.inputFileRef = React.createRef();
  }

  render() {
    return (
        <div id="uploader">
          <div className="stocks-list-uploader">
            <input
              id="uploadFileInput"
              type="file"
              ref={this.inputFileRef}
              onChange={this.props.onFileChange}
              accept=".json"
            />
            <span id="fileUploadLabel" onClick={() => this.openInputFile()}>{this.props.label}</span>
            <button
              className="btn btn-primary"
              id="uploadFileBtn"
              type="button"
              onClick={this.props.onSave}
            >
              Upload file
            </button>
          </div>
        </div>
    );
  }

  openInputFile() {
    this.inputFileRef.current.click();
  }
}
