import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaocaodoanhthutheoNgayPage } from './baocaodoanhthutheo-ngay.page';

const routes: Routes = [
  {
    path: '',
    component: BaocaodoanhthutheoNgayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaocaodoanhthutheoNgayPageRoutingModule {}
