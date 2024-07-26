import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaocaodoanhthutheoNamPage } from './baocaodoanhthutheo-nam.page';

const routes: Routes = [
  {
    path: '',
    component: BaocaodoanhthutheoNamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaocaodoanhthutheoNamPageRoutingModule {}
