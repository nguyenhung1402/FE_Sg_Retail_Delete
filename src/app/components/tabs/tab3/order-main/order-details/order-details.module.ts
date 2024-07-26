import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderDetailsPageRoutingModule } from './order-details-routing.module';

import { OrderDetailsPage } from './order-details.page';
import { MaterialModule } from 'src/app/material/material.module';
import { ShowBillComponent } from './show-bill/show-bill.component';
import { ConfigAppComponent } from '../../../tab1/config-app/config-app.component';
import { BLE } from '@awesome-cordova-plugins/ble/ngx';
import { BluetoothBillService } from '../../../tab1/config-app/bluetooth-bill.service';
import { ShowBillWebComponent } from './show-bill-web/show-bill-web.component';

@NgModule({
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    OrderDetailsPageRoutingModule,ReactiveFormsModule
  ],
  declarations: [OrderDetailsPage, ShowBillComponent, ShowBillWebComponent],
  providers:[ConfigAppComponent, BluetoothBillService,BLE]
})
export class OrderDetailsPageModule {}
