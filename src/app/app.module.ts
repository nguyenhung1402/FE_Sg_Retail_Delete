import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
// import module
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {
  CommonModule,
  DatePipe,
  HashLocationStrategy,
  LocationStrategy,
} from "@angular/common";
import { IonicStorageModule } from "@ionic/storage-angular";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./material/material.module";
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from "@angular/common/http";
import { LayoutCenterComponent } from "./pages/layout-center/layout-center.component";
import { JwtInterceptor } from "./pages/interceptor/jwt-Interceptor";
// import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
// import { DdMmYYYYDatePipe } from './_services/dd-mm-yyyy-date.pipe';
import { DataService } from "./services/data.service";
import { AndroidPermissions } from "@awesome-cordova-plugins/android-permissions/ngx";

@NgModule({
  declarations: [AppComponent, LayoutCenterComponent],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DatePipe,
    DataService,
    AndroidPermissions,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
