import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-write-feed',
    templateUrl: './write-feed.component.html',
    styleUrls: ['./write-feed.component.scss'],
})
export class WriteFeedComponent implements OnInit {

    constructor(
        private modalCtrl: ModalController,
    ) { }

    ngOnInit() { }

}
