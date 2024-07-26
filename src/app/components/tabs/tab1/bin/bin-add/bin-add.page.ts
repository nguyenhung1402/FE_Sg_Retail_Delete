import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Location } from "@angular/common";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-bin-add',
  templateUrl: './bin-add.page.html',
  styleUrls: ['./bin-add.page.scss'],
})
export class BinAddPage implements OnInit {

  Loading = true;
  formGroup!: FormGroup;
  API: string = '/table';
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
      'tablenumber': [null, Validators.required],
      'remark': [''],
      'status': ['1'],
    });
    this.formGroup.reset();
  }


  confirm(form: any) {
    this.const_data.tablenumber = form.tablenumber;
    this.const_data.remark = form.remark;
    // this.const_data.status = true;
    // this.const_data.useradd = this.currentUser?.username;
    // this.const_data.userupdate = this.currentUser?.username;

    this._data.post(this.currentUser.ip + this.API, this.const_data).subscribe(res => {
      this._data.showSaveSuccess();
    });
    this.location.back();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Notification',
      subHeader: 'Table invalid !!',
      buttons: ['OK'],
    });

    await alert.present();
  }


}
