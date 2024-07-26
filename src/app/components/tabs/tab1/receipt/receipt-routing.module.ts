import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceiptPage } from './receipt.page';

const routes: Routes = [
  {
    path: '',
    component: ReceiptPage
  },
  {
    path: 'receipt-history',
    loadChildren: () => import('./receipt-history/receipt-history.module').then( m => m.ReceiptHistoryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceiptPageRoutingModule {}
