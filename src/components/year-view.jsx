import React from 'react';
import MonthCell from "./month-cell";
import moment from 'moment';

export default function YearView(props) {
    let columns;
    switch (props.columns) {
        case 2:
            columns = 'six';
            break;
        case 3:
            columns = 'four';
            break;
        default:
            columns = 'twelve';
    }
    const rows = [];
    let counter = 0;
    for (let i=0; i<12/props.columns; i++) {
        const cells = [];
        for (let j=0; j<props.columns; j++) {
            cells.push(
                <MonthCell key={i.toString() + j.toString()}
                           columns={columns}
                           now={moment({year: props.year, month: counter})}
                           days={props.days}/>
            );
            counter++;
        }
        rows.push(
            <div key={i.toString()} className={'row'}>
                {cells}
            </div>
        );
    }
    return (
        <>
            {rows}
        </>
    );
}
