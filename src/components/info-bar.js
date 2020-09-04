import styles from "./info-bar.module.css";
import React from "react";

export default function InfoBar(props) {
    return (
        <div ref={props.xref} className={props.fixed ? styles.fixedInfoBar : styles.infoBar}>
            <div className={'container'}>
                <div className={'row'}>
                    <table className={'u-full-width'}>
                        <thead>
                        <tr>
                            <th>Verbleibende Urlaubstage</th>
                            <th>Freie Arbeitstage insgesamt</th>
                            <th>Verlängerte Wochenden</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{props.remainingVacation}</td>
                            <td>{props.vacationOverall}</td>
                            <td>{props.extendedWeekends}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}