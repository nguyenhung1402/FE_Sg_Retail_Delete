import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WarehouseDetailsPageRoutingModule } from './warehouse-details-routing.module';

import { WarehouseDetailsPage } from './warehouse-details.page';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    WarehouseDetailsPageRoutingModule
  ],
  declarations: [WarehouseDetailsPage]
})
export class WarehouseDetailsPageModule {}
