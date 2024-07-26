import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderMainPage } from './order-main.page';

const routes: Routes = [
  {
    path: '',
    component: OrderMainPage
  },
  // {
  //   path: 'order-table-detail',
  //   loadChildren: () => import('./order-table-detail/order-table-detail.module').then( m => m.OrderTableDetailPageModule)
  // },
  // {
  //   path: 'order-add',
  //   loadChildren: () => import('./order-add/order-add.module').then( m => m.OrderAddPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderMainPageRoutingModule {}
