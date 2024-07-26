import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderTableDetailPage } from './order-table-detail.page';

const routes: Routes = [
  {
    path: '',
    component: OrderTableDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderTableDetailPageRoutingModule {}
