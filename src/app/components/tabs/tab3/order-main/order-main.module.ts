import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderMainPageRoutingModule } from './order-main-routing.module';

import { OrderMainPage } from './order-main.page';
import { MaterialModule } from 'src/app/material/material.module';
import { ModalListItemComponent } from './modal-list-item/modal-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    IonicModule,
    OrderMainPageRoutingModule, ReactiveFormsModule
  ],
  declarations: [OrderMainPage, ModalListItemComponent]
})
export class OrderMainPageModule { }
