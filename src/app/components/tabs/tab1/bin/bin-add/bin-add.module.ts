import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BinAddPageRoutingModule } from './bin-add-routing.module';

import { BinAddPage } from './bin-add.page';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    BinAddPageRoutingModule
  ],
  declarations: [BinAddPage]
})
export class BinAddPageModule {}
