import { Component, NgZone, OnInit } from '@angular/core';
import { BLE } from '@awesome-cordova-plugins/ble/ngx';
import { AlertController, ModalController } from '@ionic/angular';
import moment from 'moment';
import { BluetoothBillService } from 'src/app/components/tabs/tab1/config-app/bluetooth-bill.service';
import { ConfigAppComponent } from 'src/app/components/tabs/tab1/config-app/config-app.component';
import { DataService } from 'src/app/services/data.service';

import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-show-bill',
  templateUrl: './show-bill.component.html',
  styleUrls: ['./show-bill.component.scss'],
})
export class ShowBillComponent implements OnInit {
  public configsetting: any = {};
  currentUser: any = {};
  data: any;
  date = moment();
  Loading = true;
  API_CONFIGSETTING: string = '/configsetting';
  idDevice: string = '';
  constructor(
    private _data: DataService, private ble: BLE, private ngZore: NgZone, private alertController: AlertController,
    private modalCtrl: ModalController, private config: ConfigAppComponent,
    private bluetoothBillService: BluetoothBillService,
    private storage: Storage,private authService: AuthService ) { }

  ngOnInit() {
    this.currentUser = this.authService.getParseTokenUser();
    this.loadDataConfigSettings();
    this.storage.get('idDevice').then(x => {
      this.idDevice = x;
    });
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

  confirm() {
    return this.modalCtrl.dismiss('Done', 'confirm');
  }
  async print() {
    let text: any;
    var dateBill = '';
    this.date = moment(this.data?.CreatedAt);
    dateBill = this.date.format('DD/MM/YYYY');
    text = `${this.configsetting?.company}\nĐ/c: ${this.configsetting?.address}\nSĐT: ${this.configsetting?.phone}\n-------------------------------\n\t HÓA ĐƠN\n\t${dateBill}\nHĐ: ${this.data?.ID}\nSố: ${this.data?.tablenumber}\nGhi chú: ${this.data?.remarks}\n-------------------------------\nSản phẩm\tSL\tGia\n`;
    this.data?.orderDetails.forEach((iterator: any) => {
      text += `${iterator.itemname}\n\t${iterator.quantity}\t${(iterator.price*iterator.quantity).toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}\n`
    });

    text += `-------------------------------\nThành tiền:\t\t${this.data?.total.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}\nGiảm giá:\t\t\t${this.data?.discout}%\nTổng tiền:\t\t${this.data?.doctotal.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}\nKhách trả:\t\t${this.data?.customerpay.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}\nTrả lại:\t\t${this.data?.refund.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}\n\tCảm ơn quý khách!\n\tCung cấp bởi FTISG\n\n\n\n\n\n`;

    // text = `Date:\t${dateBill}\nName:\t${this.configsetting?.company}\nAddress:\t${this.configsetting?.address}\nNote:\t${this.data?.tablenumber}\nPayment:\tTM\/CK\n-------------------------------\nProduct\tQuantity\t\tPrice\n`;
    // this.data?.orderDetails.forEach((iterator: any) => {
    //   text += `${iterator.itemname}\n\t\t\t${iterator.quantity}\t\t${iterator.price.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}\n`
    // });

    // text += `Before:\t\t\t${this.data?.total.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}(VND)\nDiscount:\t\t\t\t${this.data?.discout}%\nTotal:\t\t\t${this.data?.doctotal.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}(VND)\n`;

    // let data = this.stringToBytes(text);
    let data = this.stringToBytes(this.toNonAccentVietnamese(text));
    this.ble.write(this.idDevice, "18F0", "2AF1", data)
      .then(function (result) {
        alert("Connect : " + JSON.stringify(result));
      })
      .catch(function (error) {
        alert("Error ___ " + JSON.stringify(error));
      });
    text = '';
  }

  private stringToBytes(src: any) {
    // var array = new Uint8Array(src.length);

    var array = new Uint8Array(src.length);
    for (var i = 0, l = src.length; i < l; i++) {
      array[i] = src.charCodeAt(i);
    }
    return array.buffer;
  }

  toNonAccentVietnamese(str: any) {
    str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
  }

  // PrintElem(elem:any)
  // {
  //     var mywindow = window.open('', 'PRINT', 'height=400,width=600');

  //     mywindow!.document.write('<html><head><title>' + document.title  + '</title>');
  //     mywindow!.document.write('</head><body >');
  //     // mywindow!.document.write('<h1>' + document.title  + '</h1>');
  //     mywindow!.document.write(document.getElementById(elem)!.innerHTML);
  //     mywindow!.document.write('</body></html>');

  //     mywindow!.document.close(); // necessary for IE >= 10
  //     mywindow!.focus(); // necessary for IE >= 10*/

  //     mywindow!.print();
  //     mywindow!.close();

  //     return true;
  // }
}
