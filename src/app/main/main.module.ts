import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetimex';
import { OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';


import { MainPage } from './main.page';
import { OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS } from 'ng-pick-datetimex/date-time/adapter/moment-adapter/moment-date-time-adapter.class';
import { CalCardComponent } from '../component/cal-card/cal-card.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MainPageRoutingModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
    ],
    declarations: [
        MainPage,
        CalCardComponent
    ],
    providers: [
    {
        provide: OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS,
        useValue: {}
    },
    {
        provide: OWL_DATE_TIME_LOCALE,
        useValue: 'ko'
    },
    {
        provide: OWL_DATE_TIME_FORMATS,
        useValue: {
            monthYearLabel: 'YYYY-MMM',
        }
    },
    ],
})
export class MainPageModule { }
