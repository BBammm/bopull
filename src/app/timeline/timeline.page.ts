import { Component, OnInit } from '@angular/core';
import { TimelineApiService } from './timeline-api.service';

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.page.html',
    styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {

    public timelineList: any;

    constructor(
        private timelineSvc: TimelineApiService,
    ) { }

    ngOnInit() {
        this.getTimelineData();
    }

    private getTimelineData() {
        const timelineData = this.timelineSvc.getList().toPromise();
        timelineData.then((res) => {
            console.log('res -= ', res);
            this.timelineList = [...res];
        });
    }

}
