import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';

import { ChangeDetectionStrategy, ViewChild, TemplateRef, } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, startOfMonth, startOfWeek, endOfWeek, } from 'date-fns';
import { Observable, Subject } from 'rxjs';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, CalendarDateFormatter, DAYS_OF_WEEK } from 'angular-calendar';
import { CustomDateFormatter } from './custom-date-formmatter.provider';

const colors: any = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF',
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA',
    },
};
interface Film {
    id: number;
    title: string;
    release_date: string;
}

@Component({
    selector: 'app-main',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
    providers: [
        {
            provide: CalendarDateFormatter,
            useClass: CustomDateFormatter
        }
    ]
})
export class MainPage implements OnInit {
    @Input() timezone = 'Asia/Seoul';

    public selectedDate: any;
    public selectedDates: any;
    public pickDateObj: any;
    public cardTrigger: boolean = false;
    viewDate: Date = new Date();

    view: CalendarView = CalendarView.Month;
    events: CalendarEvent[] = [];
    weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
    weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

    refresh: Subject<any> = new Subject();




    events$: Observable<CalendarEvent<{ film: Film }>[]>;

    activeDayIsOpen: boolean = false;
    constructor() { }

    ngOnInit() {
        console.log(this.viewDate);
        this.setToday();
    }

    /**
     * setToday
     */
    public setToday() {
        this.selectedDate = moment().tz(this.timezone).toString();
        this.selectedDates = new Date(this.selectedDate);
    }
    setView(view: CalendarView) {
        this.view = view;
    }
    ionViewDidEnter() {
        // const gameLevel = document.querySelectorAll(".game-level");
    }

    /*
        날짜 클릭 event
    */
    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        console.log('date = ', date);
        console.log('events = ', events);
        console.log('date moment = ', moment(date).format('YYYY-MM-DD'));
        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    }

    addEvent({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        console.log('date = ', date);
        this.events = [
            ...this.events,
            {
                title: 'New event',
                start: date,
                // end: endOfDay(new Date()),
                color: colors.red,
                draggable: true,
                // resizable: {
                //     beforeStart: true,
                //     afterEnd: true,
                // },
            },
        ];
    }


}