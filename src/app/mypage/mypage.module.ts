import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MypagePageRoutingModule } from './mypage-routing.module';

import { MypagePage } from './mypage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MypagePageRoutingModule
  ],
  declarations: [MypagePage]
})
export class MypagePageModule {}
