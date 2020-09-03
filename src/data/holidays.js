import states from "./states";
import moment from 'moment';

function easter(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const n = Math.floor((h + l - 7 * m + 114) / 31);
    const p = (h + l - 7 * m + 114) % 31;

    return moment({year: year, month: n-1, date: p+1});
}

export default function holidays(now, state) {
    if (now.month() === 0 && now.date() === 1) {
        return 'Neujahrstag';
    }
    if (now.month() === 4 && now.date() === 1) {
        return '1. Mai';
    }
    if (now.month() === 9 && now.date() === 3) {
        return 'Tag der deutschen Einheit';
    }
    if (now.month() === 11 && now.date() === 25) {
        return '1. Weihnachtsfeiertag';
    }
    if (now.month() === 11 && now.date() === 26) {
        return '2. Weihnachtsfeiertag';
    }

    if (now.month() === 0 && now.date() === 6) {
        switch (state) {
            case states.BadenWuerttemberg:
            case states.Bayern:
            case states.SachsenAnhalt:
                return 'Heilige Drei Könige';
            default:
                break;
        }
    }

    if (now.month() === 0 && now.date() === 8) {
        if (state === states.Berlin) {
            return 'Frauentag';
        }
    }

    if (now.month() === 7 && now.date() === 15) {
        if (state === states.Saarland) {
            return 'Mariä Himmelfahrt';
        }
    }

    if (now.month() === 8 && now.date() === 20) {
        if (state === states.Thueringen) {
            return 'Weltkindertag';
        }
    }

    if (now.month() === 9 && now.date() === 31) {
        switch (state) {
            case states.Brandenburg:
            case states.Bremen:
            case states.Hamburg:
            case states.MecklenburgVorpommern:
            case states.Niedersachsen:
            case states.Sachsen:
            case states.SachsenAnhalt:
            case states.SchleswigHolstein:
            case states.Thueringen:
                return 'Reformationstag';
            default:
                break;
        }
    }

    if (now.month() === 10 && now.date() === 1) {
        switch (state) {
            case states.BadenWuerttemberg:
            case states.Bayern:
            case states.NordrheinWestfalen:
            case states.RheinlandPfalz:
            case states.Saarland:
                return 'Allerheiligen';
            default:
                break;
        }
    }

    const easterSunday = easter(now.year());
    const easterFriday = easterSunday.clone().subtract(2, 'days');
    const easterMonday = easterSunday.clone().add(1, 'days');
    if (now.isSame(easterSunday)) {
        return 'Ostern';
    }
    if (now.isSame(easterFriday)) {
        return 'Karfreitag';
    }
    if (now.isSame(easterMonday)) {
        return 'Ostermontag';
    }
    const christGoesUp = easterSunday.clone().add(39, 'days');
    if (now.isSame(christGoesUp)) {
        return 'Christi-Himmelfahrt';
    }
    const pentecost = easterSunday.clone().add(49, 'days');
    const pentecostMonday = pentecost.clone().add(1, 'days');
    if (now.isSame(pentecost)) {
        return 'Pfingstsonntag';
    }
    if (now.isSame(pentecostMonday)) {
        return 'Pfingstmontag';
    }
    const happyCadaver = easterSunday.clone().add(60, 'days');
    if (now.isSame(happyCadaver)) {
        switch (state) {
            case states.BadenWuerttemberg:
            case states.Bayern:
            case states.Hessen:
            case states.NordrheinWestfalen:
            case states.RheinlandPfalz:
            case states.Saarland:
                return 'Fronleichnam';
            default:
                break;
        }
    }
    return null;
}
