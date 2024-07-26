import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { UrlConstants } from 'src/app/commons/UrlConstants';
import { DataService } from 'src/app/services/data.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { CategoryComponent } from '../../category/category.component';
import { Location } from "@angular/common";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.page.html',
  styleUrls: ['./item-add.page.scss'],
})
export class ItemAddPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  formGroup!: FormGroup;

  const_data: any = {};
  currentUser: any = {};
  public Category: any;

  Loading = true;
  uploadImage_1: any;
  preview_upload1: any;
  fileToUpload: File | null = null;
  nameFileUpload: any;
  item_category: any;
  imgDefault = '../../../../../assets/images/imgdefault.jpeg';
  image = '';
  product_price = '';

  API_category: string = '/category';
  API: string = '/items';
  BASE_SERVERS: any = UrlConstants.BASE_SERVER + '/';

  constructor(
    private _data: DataService,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private _uploadService: FileUploadService,
    private location: Location
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.currentUser = this.authService.getParseTokenUser();
    this.loadData_Category();
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      'itemcode': [null, Validators.required],
      'itemname': [null, Validators.required],
      'category': [null, Validators.required],
      'price': [0, Validators.required],
      'status': [0, Validators.required],
      'barcode': [null],
      'remarks': [null],
      'image': [null],
      'whscode': [null]

    });
  }
 
  loadData_Category() {
    this.Loading = false;
    this._data.get(this.currentUser.ip + this.API_category).subscribe(x => {
      this.Category = x || [];
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
      console.log(error);
    });
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

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: CategoryComponent,
      componentProps: {
        data: this.item_category
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.item_category = data;
    }
  }
  CommaFormatted(event: any) {
    // skip for arrow keys
    if (event.which >= 37 && event.which <= 40) return;

    // format number
    if (this.product_price) {
      this.product_price = String(this.product_price);
      this.product_price = this.product_price.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  numberCheck(args: any) {
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
    }
  }


  confirm(form: any) {
    this.const_data.itemcode = form.itemcode;
    this.const_data.itemname = form.itemname;
    this.const_data.group = form.category.toString();
    // this.const_data.instock = Number(form.instock);
    this.const_data.price = Number(form.price.replace(/,/g, ""));
    this.const_data.status = true;
    this.const_data.useradd = this.currentUser?.username;
    this.const_data.userupdate = this.currentUser?.username;
    this.const_data.type = form.type;
    this.const_data.quantity = 1;

    this.const_data.image = this.nameFileUpload == null || this.nameFileUpload == undefined || this.nameFileUpload == '' ? '' : this.nameFileUpload.image_save_url;
    this.const_data.whscode = form.whscode;


    this._data.post(this.currentUser.ip + this.API, this.const_data).subscribe(res => {
      this._data.showSaveSuccess();
    });

    this.location.back();

  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Notification',
      subHeader: 'CardCode invalid !!',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
