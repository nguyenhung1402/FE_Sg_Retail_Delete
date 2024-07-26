import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemDetaisPage } from './item-detais.page';

const routes: Routes = [
  {
    path: '',
    component: ItemDetaisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemDetaisPageRoutingModule {}
