import React from 'react';
import states from './data/states';
import moment from 'moment';
import YearView from "./components/year-view";
import holidays from "./data/holidays";
import InfoBar from "./components/info-bar";
import styles from './app.module.css';

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
            state: states.Hessen,
            infoBarResetPoint: null,
        };

        this.headerRef = React.createRef();
        this.captureRef = React.createRef();

        this.onYearChange = this.onYearChange.bind(this);
        this.onVacationChange = this.onVacationChange.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
        this.updateCalendar = this.updateCalendar.bind(this);
        this.onDateClick = this.onDateClick.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount() {
        this.updateCalendar();
        window.addEventListener('scroll', this.listenToScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScroll)
    }

    render() {
        const remainingVacation = this.state.days.reduce((acc, e) => acc - (e.isVacation ? 1 : 0), this.state.vacation);
        const vacationOverall = this.state.days.reduce((acc, e) => (!e.isWeekend && (e.isHoliday || e.isVacation) ? acc + 1 : acc), 0);
        const extendedWeekends = 0;

        return (
            <div id={styles.app} ref={this.captureRef}>
                <div id={styles.header} className={'container'}>
                    <h1 style={{textAlign: 'center'}}>Urlaubsplaner</h1>
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
                                    Object.values(states).map(state => (
                                        <option key={state} value={state}>{state}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </div>

                <InfoBar xref={this.headerRef}
                         remainingVacation={remainingVacation}
                         vacationOverall={vacationOverall}
                         extendedWeekends={extendedWeekends}/>
                {
                    this.state.infoBarResetPoint != null &&
                    <InfoBar fixed={true}
                             remainingVacation={remainingVacation}
                             vacationOverall={vacationOverall}
                             extendedWeekends={extendedWeekends}/>
                }

                <div className={'container'}>
                    <YearView year={this.state.year} days={this.state.days} columns={3} onDateClick={this.onDateClick}/>
                </div>

                <div id={styles.saveControls}>
                    <hr/>

                    <div className={'container'}>
                        <div className={'row'} style={{textAlign: 'center', marginBottom: '8em'}}>
                            <button onClick={this.save}>Speichern</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onYearChange(event) {
        this.setState({
            year: event.target.value,
        }, () => {
            this.updateCalendar();
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
        }, () => {
            this.updateCalendar();
        });
    }

    updateCalendar() {
        const now = moment({year: this.state.year});
        const days = Array(this.state.daysInYear).fill(0).map((_, index) => {
            now.dayOfYear(index + 1);

            const day = {};

            const holiday = holidays(now, this.state.state);
            if (holiday != null) {
                day.isHoliday = true;
                day.holiday = holiday;
            }

            if (now.isoWeekday() === 6 || now.isoWeekday() === 7) {
                day.isWeekend = true;
            }

            return day;
        });
        this.setState({
            days: days,
        });
    }

    onDateClick(date) {
        const days = this.state.days;
        const day = days[date.dayOfYear() - 1];
        if (day.isWeekend || day.isHoliday) {
            return;
        }

        if (day.isVacation) {
            day.isBlocked = undefined;
            day.isVacation = undefined;
        } else if (day.isBlocked) {
            day.isVacation = undefined;
            day.isBlocked = undefined;
        } else {
            day.isVacation = true;
            day.isBlocked = undefined;
        }
        days[date.dayOfYear() - 1] = day;
        this.setState({
            days: days,
        });
    }

    listenToScroll = () => {
        const scrolled =
            document.body.scrollTop || document.documentElement.scrollTop;

        if (this.state.infoBarResetPoint == null) {
            const header = this.headerRef.current;
            const offsetTop = header.offsetTop;

            if (scrolled > offsetTop) {
                this.setState({
                    infoBarResetPoint: offsetTop,
                });
            }
        } else {
            if (scrolled < this.state.infoBarResetPoint) {
                this.setState({
                    infoBarResetPoint: null,
                });
            }
        }
    }

    save() {
        window.print();
        /*
        html2canvas(document.getElementById("capture"), {
            logging: false,
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'urlaub.png';
            link.href = canvas.toDataURL()
            link.click();
            link.remove();
        });

         */
    }
}

export default App;
