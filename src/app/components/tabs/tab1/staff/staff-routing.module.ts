import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { staffPage } from './staff.page';

const routes: Routes = [
  {
    path: '',
    component: staffPage
  },
  // {
  //   path: 'staff-add',
  //   loadChildren: () => import('./staff-add/staff-add.module').then( m => m.staffAddPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class staffPageRoutingModule {}
