import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Location } from "@angular/common";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-warehouse-add',
  templateUrl: './warehouse-add.page.html',
  styleUrls: ['./warehouse-add.page.scss'],
})
export class WarehouseAddPage implements OnInit {

  Loading = true;
  formGroup!: FormGroup;
  API: string = '/warehouse';
  const_data: any = {};
  currentUser: any = {};

  constructor(
    private _data: DataService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private location: Location
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getParseTokenUser();
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'whscode': [null, Validators.required],
      'whsname': [null, Validators.required],
      'address': [null, Validators.required],
      'remarks': [null, Validators.required],
      'status': ['1'],
    });
    this.formGroup.reset();
  }


  confirm(form: any) {
    this.const_data.whscode = form.whscode;
    this.const_data.whsname = form.whsname;
    this.const_data.address = form.address;
    this.const_data.remarks = form.remarks;
    this.const_data.status = true;
    this.const_data.useradd = this.currentUser?.username;
    this.const_data.userupdate = this.currentUser?.username;
    this.const_data.type = form.type;

    this._data.post(this.currentUser.ip + this.API, this.const_data).subscribe(res => {
      this._data.showSaveSuccess();
    });
    this.location.back();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Notification',
      subHeader: 'WhsCode invalid !!',
      buttons: ['OK'],
    });

    await alert.present();
  }


}
