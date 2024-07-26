import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BaocaoNxtPageRoutingModule } from './baocao-nxt-routing.module';

import { BaocaoNxtPage } from './baocao-nxt.page';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    BaocaoNxtPageRoutingModule
  ],
  declarations: [BaocaoNxtPage]
})
export class BaocaoNxtPageModule {}
