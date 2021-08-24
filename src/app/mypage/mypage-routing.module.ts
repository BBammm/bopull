import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MypagePage } from './mypage.page';

const routes: Routes = [
  {
    path: '',
    component: MypagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MypagePageRoutingModule {}
