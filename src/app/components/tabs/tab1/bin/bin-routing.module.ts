import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BinPage } from './bin.page';

const routes: Routes = [
  {
    path: '',
    component: BinPage
  },
  {
    path: 'bin-add',
    loadChildren: () => import('./bin-add/bin-add.module').then( m => m.BinAddPageModule)
  },
  {
    path: 'bin-details',
    loadChildren: () => import('./bin-details/bin-details.module').then( m => m.BinDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BinPageRoutingModule {}
