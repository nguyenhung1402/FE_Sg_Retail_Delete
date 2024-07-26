import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BaocaotonghopNhapkhoPageRoutingModule } from './baocaotonghop-nhapkho-routing.module';

import { BaocaotonghopNhapkhoPage } from './baocaotonghop-nhapkho.page';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    BaocaotonghopNhapkhoPageRoutingModule
  ],
  declarations: [BaocaotonghopNhapkhoPage]
})
export class BaocaotonghopNhapkhoPageModule {}
