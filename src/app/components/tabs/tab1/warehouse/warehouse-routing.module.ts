import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WarehousePage } from './warehouse.page';

const routes: Routes = [
  {
    path: '',
    component: WarehousePage
  },
  // {
  //   path: 'warehouse-add',
  //   loadChildren: () => import('./warehouse-add/warehouse-add.module').then( m => m.WarehouseAddPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarehousePageRoutingModule {}
