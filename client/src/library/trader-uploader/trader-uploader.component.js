import React, { Component } from "react";
import './style.css'

/**
 * @class TraderUploader
 * @prop {Method} onFileChange method that will process when file is selected.
 * @prop {Method} onAction method that will fire when `Upload File` button is clicked.
 */
export default class TraderUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
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
            multiple
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

  handleFileChange = async e => {
    const uploadedFiles = e.target.files;

    this.props.preProcess();
    this.toggleLoading();
    this.readMultipleFiles(uploadedFiles);

    uploadedFiles.length > 1 ? this.setFileName('Multiple CSV Files') : this.setFileName(uploadedFiles[0].name)
  }

  async readMultipleFiles(files) {
    let tempFiles = [];
    const self = this;

    async function readFile(index) {
      if (index >= files.length) return;

      let fileReader = new FileReader();
      const file = files[index];
      fileReader.onload = function (e) {
        const bin = e.target.result;
        let cache = convertCsvToJson(bin, file.name.split('.')[0]);
        cache.then((val) => {
          tempFiles = [
            ...tempFiles,
            ...val,
          ];

          if (index >= files.length) {
            self.props.onFileChange(tempFiles);
            self.toggleLoading();
          }
        });
        readFile(index += 1);
      }
      fileReader.readAsText(file)
    }

    async function convertCsvToJson(csv, name) {
      const lines = csv.split('\n');
      const result = [];
      const headers = ['trade_date', 'open', 'high', 'low', 'close', 'volume'];

      lines.map(l => {
        const obj = {};
        const line = l.split(',');

        obj['code'] = name;
        headers.map((h, i) => {
          obj[h] = line[i];
        });

        if (obj.code !== '' && obj.trade_date !== '') {
          result.push(obj);
        }
      });
      return result;
    }

    readFile(0);
  }

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading });
  }


  openInputFile() {
    this.inputFileRef.current.click();
  }

  setFileName(fileName) {
    this.setState({ fileName: fileName });
  }
}
