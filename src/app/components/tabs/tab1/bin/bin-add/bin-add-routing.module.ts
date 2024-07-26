import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BinAddPage } from './bin-add.page';

const routes: Routes = [
  {
    path: '',
    component: BinAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BinAddPageRoutingModule {}
