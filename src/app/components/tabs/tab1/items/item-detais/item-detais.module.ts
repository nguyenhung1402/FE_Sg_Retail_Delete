import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemDetaisPageRoutingModule } from './item-detais-routing.module';

import { ItemDetaisPage } from './item-detais.page';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    ItemDetaisPageRoutingModule
  ],
  declarations: [ItemDetaisPage]
})
export class ItemDetaisPageModule {}
