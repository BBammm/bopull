import { Component, Input, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-cal-card',
    templateUrl: './cal-card.component.html',
    styleUrls: ['./cal-card.component.scss'],
})
export class CalCardComponent implements OnInit {

    @Input()
    public data: any;

    constructor() { }

    ngOnInit() {
        console.log('--- data  =', this.data);
    }

}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
    ],
    declarations: [
        CalCardComponent
    ],
    exports: [
        CalCardComponent
    ]
})
export class CalCardModule { }