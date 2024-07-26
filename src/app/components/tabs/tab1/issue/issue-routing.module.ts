import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IssuePage } from './issue.page';

const routes: Routes = [
  {
    path: '',
    component: IssuePage
  },
  {
    path: 'issue-detail/:id',
    loadChildren: () => import('../../tab1/issue/issue-detail/issue-detail.module').then( m => m.IssueDetailPageModule)
  },
  // {
  //   path: 'issue-history',
  //   loadChildren: () => import('./issue-history/issue-history.module').then( m => m.IssueHistoryPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IssuePageRoutingModule {}
