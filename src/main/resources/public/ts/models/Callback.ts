import {DateUtils} from "../utils/date";

export class Time {
    hour: number;
    minute: number;
}

export class Userdata {
    prenom: string;
    nom: string;
    etablissement: string;
    classe: string;
    service: number;
    matiere: string;
}

export class Callback {
    destination: string;
    scheduled_date: any;
    scheduled_time: Time;
    userdata: Userdata;
    informations_complementaires: string;

    constructor() {
        this.destination = null;
        this.scheduled_date = null;
        this.scheduled_time = new Time();
        this.userdata = new Userdata();
        this.informations_complementaires = null;
    }

    toJson(): Object {
        return {
            destination: this.destination,
            scheduled_date: DateUtils.format(new Date(this.scheduled_date.toDateString()), DateUtils.FORMAT["YEAR-MONTH-DAY-HOUR-MIN-SEC-TIMEZONE"]),
            scheduled_time: this.scheduled_time,
            userdata: this.userdata,
            informations_complementaires: this.informations_complementaires
        }
    }
}