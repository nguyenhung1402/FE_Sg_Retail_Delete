import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderAddPageRoutingModule } from './order-add-routing.module';

import { OrderAddPage } from './order-add.page';
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
    ReactiveFormsModule,
    OrderAddPageRoutingModule
  ],
  declarations: [OrderAddPage]
})
export class OrderAddPageModule {}
