import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { staffDetailsPage } from './staff-details.page';

const routes: Routes = [
  {
    path: '',
    component: staffDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class staffDetailsPageRoutingModule {}
