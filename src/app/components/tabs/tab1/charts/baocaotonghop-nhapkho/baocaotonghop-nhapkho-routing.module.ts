import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaocaotonghopNhapkhoPage } from './baocaotonghop-nhapkho.page';

const routes: Routes = [
  {
    path: '',
    component: BaocaotonghopNhapkhoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaocaotonghopNhapkhoPageRoutingModule {}
