import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IssueHistoryPage } from './issue-history.page';

const routes: Routes = [
  {
    path: '',
    component: IssueHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IssueHistoryPageRoutingModule {}
