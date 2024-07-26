import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceiptHistoryPageRoutingModule } from './receipt-history-routing.module';

import { ReceiptHistoryPage } from './receipt-history.page';
import { MaterialModule } from 'src/app/material/material.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    ReceiptHistoryPageRoutingModule, Ng2SearchPipeModule
  ],
  declarations: [ReceiptHistoryPage]
})
export class ReceiptHistoryPageModule {}
