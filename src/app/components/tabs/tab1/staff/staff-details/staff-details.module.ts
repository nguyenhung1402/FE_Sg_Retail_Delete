import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { staffDetailsPageRoutingModule } from './staff-details-routing.module';

import { staffDetailsPage } from './staff-details.page';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    staffDetailsPageRoutingModule
  ],
  declarations: [staffDetailsPage]
})
export class staffDetailsPageModule {}
