import React, { Component } from "react";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import './style.css'

export default class TraderDatePicker extends Component {
  constructor(props) {
    super(props);

    this.handleDayChange = this.handleDayChange.bind(this);

    this.state = {
      datePickerOpen: false,
      selectedDay: undefined,
    };

  }

  render() {
    const { selectedDay } = this.state;
    return (
      <div id="trader-datepicker">
        <span>{this.props.label}</span>

        <div id="trader-datepicker-wrapper">
          <DayPickerInput
            onDayChange={this.handleDayChange}
            dayPickerProps={{
              month: new Date(2018, 10),
              showWeekNumbers: true,
              todayButton: 'Today',
            }}
          />
          <i className="fa fa-calendar fa-fw"></i>
        </div>
      </div>
    );
  }

  handleDayChange(day) {
    this.setState({ selectedDay: day });
  }
}