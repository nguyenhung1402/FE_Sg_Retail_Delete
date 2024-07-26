import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderAddPage } from './order-add.page';

const routes: Routes = [
  {
    path: '',
    component: OrderAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderAddPageRoutingModule {}
