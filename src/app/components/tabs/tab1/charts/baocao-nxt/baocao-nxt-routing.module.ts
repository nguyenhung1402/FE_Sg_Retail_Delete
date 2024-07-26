import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaocaoNxtPage } from './baocao-nxt.page';

const routes: Routes = [
  {
    path: '',
    component: BaocaoNxtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaocaoNxtPageRoutingModule {}
