import React from 'react';
import Tippy from '@tippyjs/react';
import styles from './month-cell.module.css';
import 'tippy.js/dist/tippy.css';

export default function MonthCell(props) {
    const now = props.now.clone().date(1);
    const lastMonth = props.now.clone().date(0);

    const offset = now.date(1).isoWeekday() - 1;
    const days = now.daysInMonth()

    const rows = [];
    if (offset > 0) {
        rows.push(
            [
                <td key={`kw-0-${props.year}`} className={styles.kwCell}>{lastMonth.isoWeek()}</td>
            ].concat(
                new Array(offset).fill(null).map((_, index) => (
                    <td key={`offset-${index}-${props.year}`}/>
                ))
            )
        );
    }

    for (let day = 1; day <= days; day++) {
        now.date(day);
        const dayOfWeek = now.isoWeekday();
        if (dayOfWeek === 1) {
            rows.push([<td key={`kw-${day}-${props.year}`} className={styles.kwCell}>{now.isoWeek()}</td>]);
        }
        const row = rows[rows.length - 1];

        const dayInfo = props.days[now.dayOfYear() - 1];

        let cls = styles.noInformation;
        if (dayInfo != null) {
            if (dayInfo.isWeekend) {
                cls = styles.defaultHoliday;
            }
            if (dayInfo.isHoliday) {
                cls = styles.stateHoliday;
            }
        }

        if (dayInfo && dayInfo.holiday) {
            row.push(
                <Tippy content={dayInfo.holiday}>
                    <td key={`day-${day}-${props.year}`} className={cls}>{day}</td>
                </Tippy>
            );
        } else {
            row.push(
                <td key={`day-${day}-${props.year}`} className={cls}>{day}</td>
            );
        }
    }

    return (
        <div className={props.columns + ' columns'}>
            <h2>{props.now.format('MMM')}</h2>
            <table className={styles.monthTable + ' u-full-width'}>
                <thead>
                <tr>
                    <th>KW</th>
                    <th>Mo</th>
                    <th>Di</th>
                    <th>Mi</th>
                    <th>Do</th>
                    <th>Fr</th>
                    <th>Sa</th>
                    <th>So</th>
                </tr>
                </thead>
                <tbody>
                {
                    rows.map((row, index) => (
                        <tr key={`week-${index}-${props.year}`}>{row}</tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}