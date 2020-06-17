import React, { Component } from "react";
import './style.css'

let fileReader;
/**
 * @class TraderUploader
 * @prop {Method} onFileChange method that will process when file is selected.
 * @prop {Method} onAction method that will fire when `Upload File` button is clicked.
 */
export default class TraderUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: undefined,
      loading: false,
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
            accept={`.${this.props.parseType}`}
          />
          <span id="fileUploadLabel" onClick={() => this.openInputFile()}>
            {this.state.fileName || this.props.label}
            {this.state.loading && this.renderSpinner()}
          </span>
          {this.props.actionLabel &&
            <button
              className="btn btn-primary"
              id="uploadFileBtn"
              type="button"
              onClick={this.props.onActionTriggered}
            >
              {this.props.actionLabel}
            </button>}
        </div>
      </div>
    );
  }

  renderSpinner() {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  }

  handleFileChange = e => {
    this.props.preProcess();
    this.toggleLoading();
    const uploadedFile = e.target.files[0];

    if (uploadedFile) {
      this.setFileName(uploadedFile.name);
      fileReader = new FileReader();
      fileReader.readAsText(uploadedFile);
      fileReader.onloadend = this.handleFileRead;
    }
  }

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading });
  }

  handleFileRead = e => {
    let content = fileReader.result;

    if (this.props.parseType === 'json') {
      content = JSON.parse(fileReader.result);
    }

    if (this.props.parseType === 'csv') {
      content = this.csvToJson(fileReader.result)
    }

    if (this.props.onFileChange) {
      this.props.onFileChange(content);
    }

    this.toggleLoading();
  }

  openInputFile() {
    this.inputFileRef.current.click();
  }

  setFileName(fileName) {
    this.setState({ fileName: fileName });
  }

  csvToJson(csv) {
    const lines = csv.split('\n');
    const result = [];
    const headers = ['code', 'trade_date', 'open', 'high', 'low', 'close', 'volume'];

    lines.map(l => {
      const obj = {};
      const line = l.split(',');

      headers.map((h, i) => {
        obj[h] = line[i];
      })

      if (obj.code !== '') {
        result.push(obj);
      }
    });

    return result;
  }
}
