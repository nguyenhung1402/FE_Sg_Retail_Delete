import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaocaotonghopXuatkhoPage } from './baocaotonghop-xuatkho.page';

const routes: Routes = [
  {
    path: '',
    component: BaocaotonghopXuatkhoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaocaotonghopXuatkhoPageRoutingModule {}
