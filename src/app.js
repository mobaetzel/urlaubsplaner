import React from 'react';
import states from './data/states';
import moment from 'moment';
import YearView from "./components/year-view";

class App extends React.Component {
    constructor(props) {
        super(props);

        const now = moment();
        now.year(now.year() + 1);

        this.state = {
            year: now.year(),
            vacation: 30,
            daysInYear: now.isLeapYear() ? 366 : 365,
            days: [],
            state: states[0],
        };

        this.onYearChange = this.onYearChange.bind(this);
        this.onVacationChange = this.onVacationChange.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
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
                                value={this.state.state}
                                onChange={this.onStateChange}
                                onBlur={this.updateCalendar}>
                            {
                                states.map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <hr/>

                <div>
                    <YearView year={this.state.year} days={this.state.days} columns={2}/>
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

    onStateChange(event) {
        this.setState({
            state: event.target.value,
        });
    }

    updateCalendar() {
        const now = moment({year: this.state.year});
        const days = Array(this.state.daysInYear).fill(0).map((_, index) => {
            now.dayOfYear(index + 1);
            if (now.weekday() === 5 || now.weekday() === 6) {
                return 1;
            }
            return 0;
        });
        this.setState({
            days: days,
        });
    }
}

export default App;
