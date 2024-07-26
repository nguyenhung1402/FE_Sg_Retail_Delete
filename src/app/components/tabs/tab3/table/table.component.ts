import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { AlertController, IonModal, LoadingController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  const_data_table: any = {};
  currentUser: any = {};
  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController,
    private _data: DataService,
    private alertController: AlertController,
    private formBuilder: FormBuilder, private authService: AuthService
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getParseTokenUser();
    this.createFormTable()
  }
  name: any;
  // const_data: any = [];
  const_data: any = {};
  checkedItems: any = [];
  quantity = 1;
  data: any;
  API: string = '/table'
  Loading = true;
  public Table: any;
  formGroup!: FormGroup;
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  loadData_Table() {
    this.Loading = false;
    this._data.get(this.currentUser.ip + this.API).subscribe(x => {
      this.Table = x || [];
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
      console.log(error);
    });
  }

  confirmTable(form: any) {
    this.modalCtrl.dismiss(this.name, 'confirm');
    this.const_data_table.tablenumber = form.tablenumber;
    this.const_data_table.remark = form.remark;
    this._data.post(this.currentUser.ip + this.API, this.const_data_table).subscribe(res => {
      this._data.showSaveSuccess();
    })
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Notification',
      subHeader: 'CardCode invalid !!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  createFormTable() {
    this.formGroup = this.formBuilder.group({
      'tablenumber': [null],
      'remark': [null],
    });
  }

}
