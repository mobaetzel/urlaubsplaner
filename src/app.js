import React from 'react';
import states from './data/states';

class App extends React.Component {
  constructor(props) {
    super(props);

    const now = new Date();
    this.state = {
      year: now.getFullYear(),
      vacation: 30,
      days: [],
    };

    this.onYearChange = this.onYearChange.bind(this);
    this.onVacationChange = this.onVacationChange.bind(this);
    this.updateCalendar = this.updateCalendar.bind(this);
  }

  componentDidMount() {
    this.updateCalendar();
  }

  render() {
    return (
      <div className={'container'}>
        <h1>Urlaubsmeister</h1>

        <div className={'row'}>
          <div className={'four columns'}>
            <label htmlFor={'year-input'}>Jahr</label>
            <input id={'year-input'} 
                   className={'u-full-width'} 
                   type={'number'} 
                   value={this.state.year} 
                   onChange={this.onYearChange} 
                   onBlur={this.updateCalendar}/>
          </div>
          <div className={'four columns'}>
            <label htmlFor={'vacation-input'}>Urlaubstage</label>
            <input id={'vacation-input'} 
                   className={'u-full-width'} 
                   type={'number'} 
                   value={this.state.vacation}
                   onChange={this.onVacationChange} 
                   onBlur={this.updateCalendar}/>
          </div>
          <div className={'four columns'}>
            <label htmlFor={'vacation-input'}>Bundesland</label>
            <select id={'state-input'} 
                   className={'u-full-width'} 
                   value={this.state.vacation}
                   onChange={this.onVacationChange} 
                   onBlur={this.updateCalendar}>
                {
                  states.map(state => (
                  <option key={state} value={state}>{state}</option>
                  ))
                }
              </select>
          </div>
        </div>

        <div className={'row'}>
          <ul>
          {
            this.state.days.map((d, index) => <li key={index}>{d}</li>)
          }
          </ul>
        </div>
      </div>
    );
  }

  onYearChange(event) {
    this.setState({
      year: event.target.value,
    });
  }

  onVacationChange(event) {
    this.setState({
      vacation: event.target.value,
    });
  }

  updateCalendar() {
    const days = Array(this.isLeapYear(this.state.year) ? 366 : 365).fill(0);
    console.log(days);
    this.setState({
      days: days,
    });
  }

  isLeapYear(year) {
    return (year & 3) == 0 && ((year % 25) != 0 || (year & 15) == 0);
  }
}

export default App;
