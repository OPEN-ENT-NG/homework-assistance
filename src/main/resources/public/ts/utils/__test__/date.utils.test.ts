import {DateUtils} from "../date";

describe('Date Utils Test', () => {

    test(`Using "'Thu Jul 14 2022 00:00:00 GMT+0200 (heure d’été d’Europe centrale)'" it should returns '2022-07-14T00:00:00Z'`, () => {
        const dateToTest = new Date('Thu Jul 14 2022');
        let formatDate = DateUtils.format(dateToTest, DateUtils.FORMAT["YEAR-MONTH-DAY-HOUR-MIN-SEC-TIMEZONE"]);
        expect(formatDate).toEqual('2022-07-14T00:00:00Z');
    });
});