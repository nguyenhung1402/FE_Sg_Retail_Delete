import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessDetailsPageRoutingModule } from './business-details-routing.module';

import { BusinessDetailsPage } from './business-details.page';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    BusinessDetailsPageRoutingModule
  ],
  declarations: [BusinessDetailsPage]
})
export class BusinessDetailsPageModule {}
