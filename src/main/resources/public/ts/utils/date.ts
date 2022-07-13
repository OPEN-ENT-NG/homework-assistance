import {moment} from 'entcore';
import {DurationInputArg1, DurationInputArg2} from 'moment';

export class DateUtils {

    static FORMAT = {
        'YEAR-MONTH-DAY-HOUR-MIN-SEC-TIMEZONE': 'YYYY-MM-DDTHH:mm:ss[Z]',
        'YEAR-MONTH-DAY-HOUR-MIN-SEC': 'YYYY-MM-DD HH:mm:ss',
        'YEAR-MONTH-DAY': 'YYYY-MM-DD',
        'YEARMONTHDAY': 'YYYYMMDD',
        'YEAR-MONTH': 'YYYY-MM',
        'DAY-MONTH-YEAR': 'DD/MM/YYYY',
        'DAY-MONTH': 'DD/MM', // e.g "04/11"
        'HOUR-MINUTES': 'kk:mm', // e.g "09:00"
        'BIRTHDATE': 'L',
        'DAY-MONTH-YEAR-LETTER': 'LL',  // e.g "9 juin 2019"
        'DAY-DATE': 'dddd L',
        'DATE-FULL-LETTER': 'dddd LL'
    };

    /**
     * Format date based on given format using moment
     * @param date date to format
     * @param format format
     */
    static format(date: any, format: string) {
        return moment(date).format(format);
    }

    /**
     * Add step to given date.
     * @param date Date to update
     * @param step Step size
     * @param stepType Optional. Step type.
     */
    static add(date: any, step: DurationInputArg1, stepType: DurationInputArg2 = 'd'): Date {
        return moment(date).add(step, stepType).toDate();
    }
}