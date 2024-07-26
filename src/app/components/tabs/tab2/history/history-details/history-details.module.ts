import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryDetailsPageRoutingModule } from './history-details-routing.module';

import { HistoryDetailsPage } from './history-details.page';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    CommonModule,MaterialModule,
    FormsModule,
    IonicModule,
    HistoryDetailsPageRoutingModule,ReactiveFormsModule
  ],
  declarations: [HistoryDetailsPage]
})
export class HistoryDetailsPageModule {}
