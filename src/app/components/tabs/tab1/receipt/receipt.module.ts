import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceiptPageRoutingModule } from './receipt-routing.module';

import { ReceiptPage } from './receipt.page';
import { MaterialModule } from 'src/app/material/material.module';
import { AddReceiptComponent } from './add-receipt/add-receipt.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    ReceiptPageRoutingModule, Ng2SearchPipeModule
  ],
  declarations: [ReceiptPage,AddReceiptComponent]
})
export class ReceiptPageModule {}
