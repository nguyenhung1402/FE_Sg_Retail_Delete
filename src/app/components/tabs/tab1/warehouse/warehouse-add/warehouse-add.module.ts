import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WarehouseAddPageRoutingModule } from './warehouse-add-routing.module';

import { WarehouseAddPage } from './warehouse-add.page';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    WarehouseAddPageRoutingModule
  ],
  declarations: [WarehouseAddPage]
})
export class WarehouseAddPageModule {}
