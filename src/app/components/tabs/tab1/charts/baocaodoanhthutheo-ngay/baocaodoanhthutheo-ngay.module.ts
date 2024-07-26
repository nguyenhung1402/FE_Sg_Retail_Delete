import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BaocaodoanhthutheoNgayPageRoutingModule } from './baocaodoanhthutheo-ngay-routing.module';

import { BaocaodoanhthutheoNgayPage } from './baocaodoanhthutheo-ngay.page';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    BaocaodoanhthutheoNgayPageRoutingModule
  ],
  declarations: [BaocaodoanhthutheoNgayPage]
})
export class BaocaodoanhthutheoNgayPageModule {}
