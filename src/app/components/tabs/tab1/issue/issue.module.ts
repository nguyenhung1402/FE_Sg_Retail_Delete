import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IssuePageRoutingModule } from './issue-routing.module';

import { IssuePage } from './issue.page';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    IssuePageRoutingModule,ReactiveFormsModule, Ng2SearchPipeModule
  ],
  declarations: [IssuePage,AddIssueComponent]
})
export class IssuePageModule {}
