import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { staffAddPageRoutingModule } from './staff-add-routing.module';

import { staffAddPage } from './staff-add.page';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    staffAddPageRoutingModule
  ],
  declarations: [staffAddPage]
})
export class staffAddPageModule {}
