import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IssueHistoryPageRoutingModule } from './issue-history-routing.module';

import { IssueHistoryPage } from './issue-history.page';
import { MaterialModule } from 'src/app/material/material.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    IssueHistoryPageRoutingModule,Ng2SearchPipeModule
  ],
  declarations: [IssueHistoryPage]
})
export class IssueHistoryPageModule {}
