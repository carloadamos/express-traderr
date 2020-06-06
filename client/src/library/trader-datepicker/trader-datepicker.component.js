import React, { Component } from "react";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import './style.css'

export default class TraderDatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datePickerOpen: false,
      selectedDay: undefined,
    };
  }

  render() {
    return (
      <div id="trader-datepicker">
        <span>{this.props.label}</span>
        <div id="trader-datepicker-wrapper">
          <DayPickerInput
            onDayChange={this.props.onDayChange}
            dayPickerProps={{
              showWeekNumbers: true,
              todayButton: 'Today',
            }}
          />
          <i className="fa fa-calendar fa-fw"></i>
        </div>
      </div>
    );
  }
}