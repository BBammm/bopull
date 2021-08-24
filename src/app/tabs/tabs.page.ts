import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WriteFeedComponent } from '../modal/write-feed/write-feed.component';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {

    constructor(
        private modalCtrl: ModalController,
    ) { }

    /**
     * 글 작성하기 모달창 출력
     */
    public async write() {
        let modalInstance = await this.modalCtrl.create({
            component: WriteFeedComponent,
            cssClass: 'fullscreen',
            swipeToClose: true,
        });
        return await modalInstance.present();
    }

}
