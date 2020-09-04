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
        const _now = now.clone().date(day);
        const dayOfWeek = _now.isoWeekday();
        if (dayOfWeek === 1) {
            rows.push([<td key={`kw-${day}-${props.year}`} className={styles.kwCell}>{_now.isoWeek()}</td>]);
        }
        const row = rows[rows.length - 1];

        const dayInfo = props.days[_now.dayOfYear() - 1];

        let cls = styles.noInformation;
        if (dayInfo != null) {
            if (dayInfo.isWeekend) {
                cls = styles.defaultHoliday;
            }
            if (dayInfo.isHoliday) {
                cls = styles.stateHoliday;
            }
            if (dayInfo.isVacation) {
                cls = styles.takeVacation;
            }
            if (dayInfo.isBlocked) {
                cls = styles.forbidden;
            }
        }

        const onClick = () => {
            props.onDateClick(_now);
        };
        if (dayInfo && dayInfo.holiday) {
            row.push(
                <Tippy key={`day-${day}-${props.year}`} content={dayInfo.holiday}>
                    <td className={cls} onClick={onClick}>{day}</td>
                </Tippy>
            );
        } else {
            row.push(
                <td key={`day-${day}-${props.year}`} className={cls} onClick={onClick}>{day}</td>
            );
        }
    }

    return (
        <div className={props.columns + ' columns'}>
            <h2 className={styles.monthShort}>{props.now.format('MMM')}</h2>
            <h2 className={styles.monthLong}>{props.now.format('MMMM')}</h2>
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