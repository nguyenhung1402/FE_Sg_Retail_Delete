import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { staffAddPage } from './staff-add.page';

const routes: Routes = [
  {
    path: '',
    component: staffAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class staffAddPageRoutingModule {}
