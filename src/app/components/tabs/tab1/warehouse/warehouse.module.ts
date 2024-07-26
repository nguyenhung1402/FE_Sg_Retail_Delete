import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WarehousePageRoutingModule } from './warehouse-routing.module';

import { WarehousePage } from './warehouse.page';
import { MaterialModule } from 'src/app/material/material.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    WarehousePageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [WarehousePage]
})
export class WarehousePageModule {}
