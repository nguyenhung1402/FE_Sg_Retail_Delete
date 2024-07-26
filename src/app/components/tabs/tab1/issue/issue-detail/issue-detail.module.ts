import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IssueDetailPageRoutingModule } from './issue-detail-routing.module';

import { IssueDetailPage } from './issue-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IssueDetailPageRoutingModule
  ],
  declarations: [IssueDetailPage]
})
export class IssueDetailPageModule {}
