import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { WriteFeedComponent } from '../modal/write-feed/write-feed.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TabsPageRoutingModule,
    ],
    declarations: [
        TabsPage,
        WriteFeedComponent,
    ],
    entryComponents: [
        WriteFeedComponent
    ]
})
export class TabsPageModule { }
