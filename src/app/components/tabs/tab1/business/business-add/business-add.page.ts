import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Location } from "@angular/common";
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-business-add',
  templateUrl: './business-add.page.html',
  styleUrls: ['./business-add.page.scss'],
})
export class BusinessAddPage implements OnInit {
  formGroup!: FormGroup;
  API: string = '/business';
  Loading = true;
  
  const_data: any = {};
  currentUser: any = {};

  constructor(
    private _data: DataService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private location: Location) { }

  ngOnInit() {
    this.currentUser = this.authService.getParseTokenUser();
    this.createForm();
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      'cardcode': [null, Validators.required],
      'cardname': [null, Validators.required],
      'group': [null, Validators.required],
      'address': [null, Validators.required],
      'phone': [null, Validators.required],
      'status': [null, Validators.required],
      'remarks': [null],
    });
  }
  confirm(form: any) {
      this.const_data.cardcode = form.cardcode;
      this.const_data.cardname = form.cardname;
      this.const_data.group = form.group.toString();
      this.const_data.address = form.address;
      this.const_data.phone = form.phone;
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
      subHeader: 'Không được để trống !!',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
