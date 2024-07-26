import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BaocaodoanhthutheoNamPageRoutingModule } from './baocaodoanhthutheo-nam-routing.module';

import { BaocaodoanhthutheoNamPage } from './baocaodoanhthutheo-nam.page';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    BaocaodoanhthutheoNamPageRoutingModule
  ],
  declarations: [BaocaodoanhthutheoNamPage]
})
export class BaocaodoanhthutheoNamPageModule {}
