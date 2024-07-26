import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaocaodoanhthutheoThangPage } from './baocaodoanhthutheo-thang.page';

const routes: Routes = [
  {
    path: '',
    component: BaocaodoanhthutheoThangPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaocaodoanhthutheoThangPageRoutingModule {}
