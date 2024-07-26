import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab3Page } from './tab3.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page
  },
  
  {
    path: 'order-details/:id',
    loadChildren: () => import('./order-main/order-details/order-details.module').then(m => m.OrderDetailsPageModule)
  },
  {
    path: 'order-add/:id',
    loadChildren: () => import('./order-main/order-add/order-add.module').then(m => m.OrderAddPageModule)
  },
  {
    path: 'order-table-detail/:id',
    loadChildren: () => import('./order-main/order-table-detail/order-table-detail.module').then( m => m.OrderTableDetailPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab3PageRoutingModule {}
