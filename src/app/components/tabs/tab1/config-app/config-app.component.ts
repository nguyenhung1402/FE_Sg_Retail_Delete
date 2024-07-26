import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { BLE } from '@awesome-cordova-plugins/ble/ngx';
import { BluetoothBillService } from './bluetooth-bill.service';
import {FileUploadService} from "../../../../services/file-upload.service";
import {UrlConstants} from "../../../../commons/UrlConstants";

@Component({
  selector: 'app-config-app',
  templateUrl: './config-app.component.html',
  styleUrls: ['./config-app.component.scss'],
})
export class ConfigAppComponent implements OnInit {
  formGroup!: FormGroup;
  Loading = true;
  API: string = '/configsetting';
  BASE_SERVERS: any = UrlConstants.BASE_SERVER + '/';
  uploadImage_1: any;
  preview_upload1: any;
  fileToUpload: File | null = null;
  nameFileUpload: any;
  anh: any;

  const_data: any = {};
  const_all: any = {};
  currentUser: any = {};
  devices: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private _data: DataService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private ble: BLE, private ngZore: NgZone,
    private alertController: AlertController,
    private _uploadService: FileUploadService,
    private bluetoothBillService:BluetoothBillService
    ) { }

  ngOnInit() {
    this.currentUser = this.authService.getParseTokenUser();
    this.loaddata();
  }

  loaddata() {
    this.Loading = false;
    this.createForm();
    const itemId = '';
    if (itemId != null || itemId != undefined) {
      this._data.get(this.currentUser.ip + this.API).subscribe(x => {
        this.const_all = x || [];
        console.log(this.const_all);
        this.setValue(this.const_all?.data);
        this.Loading = true;
      }, (error) => {
        this.Loading = true;
      });
    } else {
      this.Loading = true;
    }
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'company': [null],
      'address': [null, Validators.required],
      'phone': [null],
      'masothue': [null],
      'ip_connection': [null],
      'database': [null],
      'image': [null],
    });
  }

  setValue(data: any) {
    var imgDefault = '../../../../../../assets/images/imgdefault.jpeg';
    if (data.length > 0) {
      this.formGroup.controls["company"].setValue(data[0].company);
      this.formGroup.controls["address"].setValue(data[0].address);
      this.formGroup.controls["phone"].setValue(data[0].phone);
      this.formGroup.controls["masothue"].setValue(data[0].mst);
      this.formGroup.controls["ip_connection"].setValue(this.currentUser.ip);
      this.formGroup.controls["database"].setValue(this.currentUser.nameDB);

      this.formGroup.controls["ip_connection"].disable();
      this.formGroup.controls["database"].disable();
      if (data[0].image == null || data[0].image == undefined || data[0].image == '') {
        this.preview_upload1 = imgDefault
      } else {
        this.preview_upload1 = this.BASE_SERVERS + data[0].image;
        this.anh = data[0].image;
      }
      this.formGroup.controls["image"].setValue(this.preview_upload1);
    } else {
      return;
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(data: any) {
    var const_result  = {};
    if (this.const_all?.data.length <= 0) {
      const_result = {
        company: data.company,
        address: data.address,
        phone: data.phone,
        mst: data.masothue,
        ip: data.ip_connection,
        database: data.database,
        username: this.currentUser?.username,
        password: this.currentUser?.username,
        image: this.nameFileUpload == null || this.nameFileUpload == undefined || this.nameFileUpload == '' ? '' : this.nameFileUpload.image_save_url
      }
      this._data.post(this.currentUser.ip + this.API, const_result).subscribe(res => {
        this._data.showUpdateSuccess('');
      });
    } else {
      const itemId = this.const_all?.data[0].ID;
      const_result = {
        company: data.company,
        address: data.address,
        phone: data.phone,
        mst: data.masothue,
        ip: data.ip_connection,
        database: data.database,
        username: this.currentUser?.username,
        password: this.currentUser?.username,
        image: this.nameFileUpload == null || this.nameFileUpload == undefined || this.nameFileUpload == '' ? '' : this.nameFileUpload.image_save_url
      }
      this._data.put(this.currentUser.ip + this.API + `/${itemId}`, const_result).subscribe(res => {
        this._data.showUpdateSuccess('');
      });
    }
    return this.modalCtrl.dismiss('this.name', 'confirm');
  }


  Scan() {
    this.devices = [];
    // this.ble.scan([], 15).subscribe((device: any) => this.onDevicesDiscovered(device));
    this.bluetoothBillService.Scan();
    this.devices = this.bluetoothBillService.devices;
  }
  async connectPrint(device: any) {
    this.bluetoothBillService.connectPrint(device);
  }

  selectFile(event: any) {
    const file = event.target.files[0];
    this.uploadImage_1 = event.target.files as FileList
    const reader = new FileReader();
    reader.onload = e => this.preview_upload1 = reader.result;

    reader.readAsDataURL(file);
    this.handleFileInput();
  }

  handleFileInput() {
    this.fileToUpload = null;

    var nameFile;
    this.fileToUpload = this.uploadImage_1.item(0);
    if (this.fileToUpload) {
      this._uploadService.postFile(this.fileToUpload).subscribe((data: any) => {
        this.nameFileUpload = data;
      }, (error: any) => {
        console.log(error);
      });
    }
  }

  // onDevicesDiscovered(device: any) {
  //   console.log('Discovered' + JSON.stringify(device, null, 2));
  //   this.ngZore.run(() => {
  //     this.devices.push(device);
  //   });
  // }
  // async connectPrint(device: any) {
  //   const alert = await this.alertController.create({
  //     header: 'Connect',
  //     message: 'Do you want to connect with?',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Connect',
  //         handler: () => {
  //           this.ble.connect(device.id).subscribe(() => {
  //             this.success(device.id), this.fail
  //           });
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  // success = (id: any) => {
  //   this.deviceConnected(id);
  // }

  // fail = (error: any) => {
  //   alert(error);
  // }

  // deviceConnected(id: any) {
  //   this.ble.isConnected(id).then(success => {
  //     this.idDevice = id;
  //     alert('Connected Successfullly');
  //   }, error => {
  //     alert('error' + JSON.stringify(error));
  //   });
  // }

  // async disconnect(id: any) {
  //   const alert = await this.alertController.create({
  //     header: 'Disconnect?',
  //     message: 'Do you want to Disconnect?',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Disconnect',
  //         handler: () => {
  //           this.ble.disconnect(id);
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

}
