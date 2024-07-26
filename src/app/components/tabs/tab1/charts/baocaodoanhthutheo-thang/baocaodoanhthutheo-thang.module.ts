import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BaocaodoanhthutheoThangPageRoutingModule } from './baocaodoanhthutheo-thang-routing.module';

import { BaocaodoanhthutheoThangPage } from './baocaodoanhthutheo-thang.page';
import { MaterialModule } from 'src/app/material/material.module';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    BaocaodoanhthutheoThangPageRoutingModule
  ],
  declarations: [BaocaodoanhthutheoThangPage]
})
export class BaocaodoanhthutheoThangPageModule {}
