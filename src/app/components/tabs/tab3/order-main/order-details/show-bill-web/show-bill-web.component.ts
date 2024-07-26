import { Component, NgZone, OnInit } from '@angular/core';
import { BLE } from '@awesome-cordova-plugins/ble/ngx';
import { AlertController, ModalController } from '@ionic/angular';
import moment from 'moment';
import { ConfigAppComponent } from 'src/app/components/tabs/tab1/config-app/config-app.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import {UrlConstants} from "../../../../../../commons/UrlConstants";

@Component({
  selector: 'app-show-bill-web',
  templateUrl: './show-bill-web.component.html',
  styleUrls: ['./show-bill-web.component.scss'],
})
export class ShowBillWebComponent implements OnInit {
  public configsetting: any = {};
  currentUser: any = {};
  data: any;
  date = moment();
  Loading = true;
  datetimeHHmm = new Date();
  API_CONFIGSETTING: string = '/configsetting';
  BASE_SERVERS: any = UrlConstants.BASE_SERVER + '/';
  idDevice: string = '';
  constructor(
    private _data: DataService, private ble: BLE, private ngZore: NgZone, private alertController: AlertController,
    private modalCtrl: ModalController, private config: ConfigAppComponent,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getParseTokenUser();
    this.loadDataConfigSettings();
  }

  print() {
    // console.log(this.data);
    window.focus();
    window.print();
    window.close();
    // var myWindow = window.open('', 'Receipt', 'height=400,width=600');
    // myWindow?.document.write('<html><head><title>Receipt</title>');
    // /*optional stylesheet*/ //myWindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" />');
    // myWindow?.document.write('<style type="text/css"> *, html {margin:0;padding:0;} </style>');
    // myWindow?.document.write('</head><body>');
    // myWindow?.document.write(this.data);
    // myWindow!?.document.write('</body></html>');
    // myWindow?.document.close(); // necessary for IE >= 10

    // myWindow!.onload=function(){ // necessary if the div contain images

    //     // myWindow?.focus(); // necessary for IE >= 10
    //     // myWindow?.print();
    //     // myWindow?.close();
    // };
  }
  confirm() {
    return this.modalCtrl.dismiss('Done', 'confirm');
  }
  loadDataConfigSettings() {
    this.Loading = false;
    this._data.get(this.currentUser.ip + this.API_CONFIGSETTING).subscribe(x => {
      this.configsetting = x || [];
      this.setValueConfigSettings(x || []);
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
      console.log(error);
    });
  }
  setValueConfigSettings(data: any) {
    this.configsetting = data?.data[0];
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
