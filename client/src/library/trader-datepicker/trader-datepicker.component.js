import React, { Component } from "react";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import './style.css'

export default class TraderDatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datePickerOpen: false,
      selectedDate: undefined,
    };

    this.datePickerRef = React.createRef();
  }

  render() {
    return (
      <div id="trader-datepicker" onClick={() => this._showDatePicker()}>
        <span>{this.props.label}</span>
        <div id="trader-datepicker-wrapper">
          <DayPickerInput ref={this.datePickerRef} />
          <span>{this.state.selectedDate || 'MM-DD-YYYY'}</span>
          <i className="fa fa-calendar fa-fw"></i>
        </div>
      </div>
    );
  }

  _showDatePicker() {
    this.setState({ datePickerOpen: !this.state.datePickerOpen }, () => {
      this.state.datePickerOpen
        ? this.datePickerRef.current.showDayPicker()
        : this.datePickerRef.current.hideDayPicker();
    });
  }
}