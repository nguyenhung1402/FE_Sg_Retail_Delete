import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessPageRoutingModule } from './business-routing.module';

import { BusinessPage } from './business.page';
import { MaterialModule } from 'src/app/material/material.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    BusinessPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [BusinessPage]
})
export class BusinessPageModule {}
