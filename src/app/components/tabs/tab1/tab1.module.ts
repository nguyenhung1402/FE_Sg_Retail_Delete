import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../../../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { DataService } from 'src/app/services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './category/category.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ConfigAppComponent } from './config-app/config-app.component';
import { ModalDetailsPaymentYesnoComponent } from '../tab3/order-main/order-details/modal-details-payment-yesno/modal-details-payment-yesno.component';

import { BLE } from '@awesome-cordova-plugins/ble/ngx';
import { BluetoothBillService } from './config-app/bluetooth-bill.service';

@NgModule({
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,Ng2SearchPipeModule
  ],
  declarations: [Tab1Page,CategoryComponent,ConfigAppComponent,ModalDetailsPaymentYesnoComponent],
  entryComponents: [CategoryComponent],
  providers: [DataService,HttpClientModule, BluetoothBillService,BLE]
})
export class Tab1PageModule {}
