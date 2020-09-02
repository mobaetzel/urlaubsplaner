import React from 'react';

export default function MonthCell(props) {
    return (
        <div className={props.columns + ' columns'}>
            <h2>{props.now.format('MMM')}</h2>
            <table className={'u-full-width'}>
                <thead>
                <tr>
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
                    props.now.daysInMonth()
                }
                </tbody>
            </table>
        </div>
    );
}