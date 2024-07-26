import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessAddPageRoutingModule } from './business-add-routing.module';

import { BusinessAddPage } from './business-add.page';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    BusinessAddPageRoutingModule
  ],
  declarations: [BusinessAddPage]
})
export class BusinessAddPageModule {}
