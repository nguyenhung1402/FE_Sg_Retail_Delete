import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../../../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { PosPage } from './pos/pos.page';
import { HistoryPage } from './history/history.page';
import { PosAdditemsComponent } from './pos-additems/pos-additems.component';
import { DataService } from 'src/app/services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/material/material.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  schemas:[
  CUSTOM_ELEMENTS_SCHEMA
],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,MaterialModule,
    HttpClientModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  declarations: [Tab2Page,PosPage,PosAdditemsComponent],
  entryComponents: [PosPage,PosAdditemsComponent],
  providers: [DataService,HttpClientModule]
})
export class Tab2PageModule {}
