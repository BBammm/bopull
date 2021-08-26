import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
    @Input() timezone = 'Asia/Seoul';
    // public minDate = moment().startOf('date').add(1, 'day');
    // public maxDate = moment().startOf('date').add(15, 'day');
    public selectedDate;

    public pickDateObj: any;

    constructor() { }

    ngOnInit() {
    }


    dtChanges(date: moment.Moment) {
        if (!date) return;
        console.log(date);
        this.pickDateObj = this.assignDate(moment(date));

        console.log(this.pickDateObj);
    }

    assignDate(m: moment.Moment) {
        return {
            dateISOString: m.tz(this.timezone).toISOString(),
            dateEndISOString: m.tz(this.timezone).endOf('date').toISOString(),
            dateSimpleLabel: m.tz(this.timezone).format('M/D'),
        }
    }

    /**
     * setToday
     */
    public setToday() {
        this.selectedDate = moment().tz(this.timezone).toISOString();
    }
}
