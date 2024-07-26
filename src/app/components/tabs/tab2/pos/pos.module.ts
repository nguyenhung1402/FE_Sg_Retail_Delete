import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PosPageRoutingModule } from './pos-routing.module';

import { PosPage } from './pos.page';

@NgModule({schemas:[
  CUSTOM_ELEMENTS_SCHEMA
],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PosPageRoutingModule,ReactiveFormsModule
  ],
  declarations: []
})
export class PosPageModule {}
