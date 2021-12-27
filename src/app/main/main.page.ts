import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';

import { ChangeDetectionStrategy, ViewChild, TemplateRef, } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, startOfMonth, startOfWeek, endOfWeek, } from 'date-fns';
import { Observable, Subject, Subscription } from 'rxjs';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, CalendarDateFormatter, DAYS_OF_WEEK } from 'angular-calendar';
import { CustomDateFormatter } from './custom-date-formmatter.provider';
import { ActivatedRoute } from '@angular/router';
import { MainApiService } from './main-api.service';
import { DataSharingService } from './data-sharing.service';

const colors: any = {
    red: {
        primary: '#ED0000',
        secondary: '#ED0000',
        flag: false
    },
    blue: {
        primary: '#001DED',
        secondary: '#001DED',
        flag: false
    },
    pink: {
        primary: '#FF33E9',
        secondary: '#FF33E9',
        flag: false
    },
    black: {
        primary: '#000000',
        secondary: '#000000',
        flag: false
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
export class MainPage implements OnInit, OnDestroy {
    @Input() timezone = 'Asia/Seoul';

    public selectedDate: any;
    public selectedDates: any;
    public pickDateObj: any;
    public cardTrigger: boolean = false;
    public scheduleList: any = [];
    public events: any = [];
    public activeColor = '';
    public routeSubscription: Subscription;
    public subscription: Subscription;
    public isPending: boolean;

    public viewData = [];
    public isHaveData: boolean;

    viewDate: Date = new Date();

    view: CalendarView = CalendarView.Month;
    weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
    weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

    refresh: Subject<any> = new Subject();
    events$: Observable<CalendarEvent<{ film: Film }>[]>;

    activeDayIsOpen: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private mainApi: MainApiService,
        private cd: ChangeDetectorRef,
        private dataSharingSvc: DataSharingService,
    ) {
        this.dataSharingSvc.isGetData.subscribe(value => {
            this.isHaveData = value;
        });
    }

    ngOnInit() {
        this.setToday();
        this.activeColor = 'r';
        this.isPending = false;

        this.routeSubscription = this.route.paramMap.subscribe({
            next: async () => {
                this.events = await this.mainApi.getList().toPromise();
                this.events.forEach(el => {
                    console.log('el = ', el);
                    el.start = new Date(el.date_format);
                });
                console.log('this.events = ', this.events);
                this.cd.detectChanges();
            }
        });
    }

    ngOnDestroy() {
        if (this.routeSubscription) this.routeSubscription.unsubscribe();
    }

    ionViewDidEnter () {
        this.isPending = true;
        console.log('ionViewDidEnter');
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

    /*
        날짜 클릭 event
    */
    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
             }
        }
    }

    addEvent({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        // console.log('date = ', date);
        // console.log('date = ', moment.tz(date, 'Asia/Seoul').format('YYYY-MM-DD'));
        console.log('date - ', date);
        console.log('moment - ', moment(date).format('YYYY-MM-DD'));

        const dateFormat = moment(date).format('YYYY-MM-DD');
        this.mainApi.getSchedule(dateFormat).subscribe((res: any) => {
            this.viewData = [...res];
            (this.viewData.length !== 0) ? this.dataSharingSvc.isGetData.next(true) : this.dataSharingSvc.isGetData.next(false);
            console.log(this.isHaveData);
        });
        this.events = [
            ...this.events,
            // {
            //     title: '',
            //     start: date,
            //     // end: endOfDay(new Date()),
            //     color: colors.red,
            //     draggable: true,
            //     // resizable: {
            //     //     beforeStart: true,
            //     //     afterEnd: true,
            //     // },
            // },
        ];
        // console.log('this.events = ', this.events);
    }

    /**
     * 등록하기 클릭 시
     */
    public register(eventData: any, index: any) {
        console.log('eventData = ', eventData, index);
        this.events[index].title = eventData.title;
        this.events[index].start = eventData.start;
        const data = {
            title: eventData.title,
            start: eventData.start,
            start_format: moment(eventData.start).format('YYYY-MM-DD'),
            color: this.events[index].color
        };
        console.log('data = ', data);
    }

    /**
     * 색상변경
     */
    public setSchColor(color, index) {
        this.activeColor = color;
        switch (color) {
            case 'r':
                this.events[index].color = colors.red;
                break;
            case 'b':
                this.events[index].color = colors.blue;
                break;
            case 'p':
                this.events[index].color = colors.pink;
                break;
            case 'bl':
                this.events[index].color = colors.black;
                break;
        }
    }

    /*
        변경한 색이 맞는지 아닌지 actvice class를 위한 func
    */
    public isActive(color) {
        return this.activeColor === color;
    }

    closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
    }


}