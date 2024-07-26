import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BaocaotonghopXuatkhoPageRoutingModule } from './baocaotonghop-xuatkho-routing.module';

import { BaocaotonghopXuatkhoPage } from './baocaotonghop-xuatkho.page';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    BaocaotonghopXuatkhoPageRoutingModule
  ],
  declarations: [BaocaotonghopXuatkhoPage]
})
export class BaocaotonghopXuatkhoPageModule {}
