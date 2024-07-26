import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BaocaodoanhthuNhanVienPageRoutingModule } from './baocaodoanhthu-nhanvien-routing.module';

import { BaocaodoanhthuNhanVienPage } from './baocaodoanhthu-nhanvien.page';
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
    BaocaodoanhthuNhanVienPageRoutingModule
  ],
  declarations: [BaocaodoanhthuNhanVienPage]
})
export class BaocaodoanhthuNhanVienPageModule {}
