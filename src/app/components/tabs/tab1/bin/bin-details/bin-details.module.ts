import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BinDetailsPageRoutingModule } from './bin-details-routing.module';

import { BinDetailsPage } from './bin-details.page';
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
    BinDetailsPageRoutingModule
  ],
  declarations: [BinDetailsPage]
})
export class BinDetailsPageModule {}
