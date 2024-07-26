import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { AlertController, IonModal, LoadingController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  const_data_category: any = {};
  currentUser: any = {};

  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController,
    private _data: DataService,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private authService: AuthService 
    ) { }

  ngOnInit() {
    this.currentUser = this.authService.getParseTokenUser();
    this.createFormCategory()
  }
  name: any;
  // const_data: any = [];
  const_data: any = {};
  checkedItems: any = [];
  quantity=1;
  data: any;
  API: string = '/category'
  Loading = true;
  public Category:any;
  formGroup!: FormGroup;
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  loadData_Category() {
    this.Loading = false;
    this._data.get(this.currentUser.ip + this.API).subscribe(x => {
      this.Category = x || [];
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
      console.log(error);
    });
  }

    confirmCategory(form: any) {
    this.modalCtrl.dismiss(this.name, 'confirm');
    if (form.categorycode == null || form.categorycode == undefined || form.categorycode == '') {
      this.presentAlert();
      return;
    } else {
      this.const_data_category.categorycode = form.categorycode;
      this.const_data_category.categoryname = form.categoryname;
      this.const_data_category.statuscategory = true;

     
      this._data.post(this.currentUser.ip + this.API, this.const_data_category).subscribe(res => {
        this._data.showSaveSuccess();
      })
    }
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Notification',
      subHeader: 'CardCode invalid !!',
      buttons: ['OK'],
    });

    await alert.present();
  }

    createFormCategory() {
    this.formGroup = this.formBuilder.group({
      'categorycode': [null, Validators.required],
      'categoryname': [null, Validators.required],
      'statuscategory': [0, Validators.required],


    });
  }

}
