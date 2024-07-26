import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WarehouseDetailsPage } from './warehouse-details.page';

const routes: Routes = [
  {
    path: '',
    component: WarehouseDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarehouseDetailsPageRoutingModule {}
