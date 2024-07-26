import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderTableDetailPageRoutingModule } from './order-table-detail-routing.module';

import { OrderTableDetailPage } from './order-table-detail.page';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    OrderTableDetailPageRoutingModule
  ],
  declarations: [OrderTableDetailPage]
})
export class OrderTableDetailPageModule {}
