import { Injectable, NgZone } from '@angular/core';

import { BLE } from '@awesome-cordova-plugins/ble/ngx';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class BluetoothBillService {
  devices: any = [];
  idDevice: string = '';
  // const_device = new BehaviorSubject(null);

  constructor(
    private ble: BLE, private ngZore: NgZone,
    private storage: Storage,
    private alertController: AlertController) { }

  Scan() {
    this.devices = [];
    this.storage.set('idDevice', '20');
    this.ble.scan([], 15).subscribe((device: any) => this.onDevicesDiscovered(device));
  }
  onDevicesDiscovered(device: any) {
    this.ngZore.run(() => {
      this.devices.push(device);
    });


  }
  async connectPrint(device: any) {
    const alert = await this.alertController.create({
      header: 'Connect',
      message: 'Do you want to connect with?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Connect',
          handler: () => {
            this.ble.connect(device.id).subscribe(() => {
              this.success(device.id), this.fail
            });
          }
        }
      ]
    });
    // this.idDevice = device.id;
    await alert.present();
  }

  success = (id: any) => {
    this.idDevice = id;
    console.log(id)
    this.deviceConnected(id);
  }

  fail = (error: any) => {
    alert(error);
  }

  deviceConnected(id: any) {
    this.ble.isConnected(id).then(success => {
      this.idDevice = id;
      this.storage.set('idDevice', id);
      alert('Connected Successfullly');
    }, error => {
      alert('error' + JSON.stringify(error));
    });
  }

  async disconnect(id: any) {
    const alert = await this.alertController.create({
      header: 'Disconnect?',
      message: 'Do you want to Disconnect?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Disconnect',
          handler: () => {
            this.ble.disconnect(id);
          }
        }
      ]
    });
    await alert.present();
  }

  getIdDevice() {
    return this.idDevice;
  }


}
