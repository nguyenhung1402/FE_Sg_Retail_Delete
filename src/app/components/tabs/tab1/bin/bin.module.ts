import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BinPageRoutingModule } from './bin-routing.module';

import { BinPage } from './bin.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
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
    BinPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [BinPage]
})
export class BinPageModule {}
