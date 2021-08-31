import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
    @Input() timezone = 'Asia/Seoul';

    public selectedDate: any;
    public pickDateObj: any;
    public cardTrigger: boolean = false;

    constructor() { }

    ngOnInit() {
    }


    dtChanges(date: any) {
        if (!date) return;
        console.log(date);
        this.pickDateObj = this.assignDate(moment(date));

        console.log(this.pickDateObj);
    }

    assignDate(m: moment.Moment) {
        return m.tz(this.timezone).format('YYYY/M/D');
    }

    /**
     * setToday
     */
    public setToday() {
        this.selectedDate = moment().tz(this.timezone).toISOString();
    }
}
