import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BinDetailsPage } from './bin-details.page';

const routes: Routes = [
  {
    path: '',
    component: BinDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BinDetailsPageRoutingModule {}
