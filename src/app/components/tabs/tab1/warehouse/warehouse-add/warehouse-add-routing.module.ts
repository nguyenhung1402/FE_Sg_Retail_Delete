import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WarehouseAddPage } from './warehouse-add.page';

const routes: Routes = [
  {
    path: '',
    component: WarehouseAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarehouseAddPageRoutingModule {}
