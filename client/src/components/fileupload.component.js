import React, { Component } from "react";

let fileReader;
/**
 * @class FileUpload
 * @prop {Method} onFileChange method that will process when file is selected.
 * @prop {Method} onAction method that will fire when `Upload File` button is clicked.
 */
export default class Fileupload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: 'Please select a file',
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
            onChange={this.handleFileChange}
            accept=".json"
          />
          <span id="fileUploadLabel" onClick={() => this.openInputFile()}>
            {this.state.fileName}
          </span>
          {
            this.props.actionLabel &&
            <button
              className="btn btn-primary"
              id="uploadFileBtn"
              type="button"
              onClick={this.props.onActionTriggered}
            >
              {this.props.actionLabel}
            </button>
          }
        </div>
      </div>
    );
  }

  handleFileChange = e => {
    const uploadedFile = e.target.files[0];

    if (uploadedFile) {
      this.setFileName(uploadedFile.name);
      fileReader = new FileReader();
      fileReader.onloadend = this.handleFileRead;
      fileReader.readAsText(uploadedFile);
    }
  }

  handleFileRead = e => {
    const content = JSON.parse(fileReader.result);

    if (this.props.onFileChange) {
      this.props.onFileChange(content);
    }
  }

  openInputFile() {
    this.inputFileRef.current.click();
  }

  setFileName(fileName) {
    this.setState({ fileName: fileName });
  }
}
