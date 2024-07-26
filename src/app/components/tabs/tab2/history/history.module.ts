import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryPageRoutingModule } from './history-routing.module';

import { HistoryPage } from './history.page';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    CommonModule,MaterialModule,
    FormsModule,
    IonicModule,
    HistoryPageRoutingModule,ReactiveFormsModule
  ],
  declarations: [HistoryPage]
})
export class HistoryPageModule {}
