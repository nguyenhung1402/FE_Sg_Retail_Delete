import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
// import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../../../explore-container/explore-container.module';

import { Tab3PageRoutingModule } from './tab3-routing.module';

import { Tab3Page } from './tab3.page';
import { DataService } from 'src/app/services/data.service';
import { HttpClientModule } from '@angular/common/http';
// import { OrdersPage } from './orders/orders.page';
import { OrderItemsComponent } from './order-items/order-items.component';
import { MaterialModule } from 'src/app/material/material.module';
// import { OrderPageModule } from './orders/orders.module';
import { OrderMainPage } from './order-main/order-main.page';
// import { OrderDetailsPageModule } from './order/order-details/order-details.module';
import {TableComponent } from './table/table.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    HttpClientModule,
    // OrderDetailsPageModule,
    Tab3PageRoutingModule,ExploreContainerComponentModule,ReactiveFormsModule,Ng2SearchPipeModule
  ],
  declarations: [Tab3Page,TableComponent,OrderMainPage,OrderItemsComponent],
  entryComponents: [OrderMainPage,OrderItemsComponent,TableComponent],
  providers: [DataService,HttpClientModule]

})
export class Tab3PageModule {}
