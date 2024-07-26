import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceiptHistoryPage } from './receipt-history.page';

const routes: Routes = [
  {
    path: '',
    component: ReceiptHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceiptHistoryPageRoutingModule {}
