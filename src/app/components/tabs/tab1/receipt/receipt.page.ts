import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { IonModal, ModalController, NavController } from '@ionic/angular';
// import { GoodsReceiptComponent } from '../goodsreceipt/goodsreceipt.component';
// import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
// import { DataService } from 'src/app/service/data.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { DataService } from 'src/app/services/data.service';
import { AlertController } from '@ionic/angular';
import { AddReceiptComponent } from './add-receipt/add-receipt.component';
import { UrlConstants } from 'src/app/commons/UrlConstants';
import { issue, receipt } from 'src/app/services/link-id.index';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage implements OnInit {
  headerMenu = '';
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('valuesinput') valuesinput: any;

  formGroup!: FormGroup;
  message = 'This modal example uses the modalController to present and dismiss modals.';
  content: any;
  const_data: any = [];
  const_bp: any = {};
  currentUser: any = {};
  warehouse: any = [];
  // totalValues = 0
  // totalSum = 0
  // discount = 0;
  quantity = 1;
  handlerMessage = '';
  roleMessage = '';
  Loading = true;
  API_WAREHOUSE: string = '/warehouse';
  API_RECEIPT: string = '/receipt';
  API_BP: string = '/business';
  BASE_SERVERS: any = UrlConstants.BASE_SERVER + '/';
  imgDefault = '../../../../assets/images/imgdefault.jpeg';


  // autocomplete cardcode
  myControlCardCode = new FormControl('');
  filteredOptionsCardCode: Observable<any[]> | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    // private pdfGenerator: PDFGenerator,
    private _data: DataService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private authService: AuthService 
  ) {
  }

  ngOnInit() {
    this.currentUser = this.authService.getParseTokenUser();
    this.loaddata_bp();
    this.createForm();
    this.headerMenu = this.activatedRoute.snapshot.data['some_date'];
    this.const_data = [];
    this.loadData();
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      'cardcode': [null],
      'cardname': [null]
    });
    this.formGroup.controls['cardname'].disable();
  }
  loadData() {
    this.Loading = false;
    this._data.get(this.currentUser.ip + this.API_WAREHOUSE).subscribe(x => {
      this.warehouse = x || [];
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
      console.log(error);
    });
  }

  loaddata_bp() {
    this.Loading = false;
    this._data.get(this.currentUser.ip + this.API_BP).subscribe(x => {
      // this.const_bp = x || [];
      this.setDataBP(x || []);
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
      console.log(error);
    });

  }
  setDataBP(data: any) {
    this.const_bp = data;
    this.autocompateCardCode();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AddReceiptComponent,
      componentProps: {
        data: this.const_data
      },
      backdropDismiss: false
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.const_data = data;
    }
  }

  total(event1: any, quantity: any, itemcode: any) {
    // this.totalValues = 0;
    this.const_data.forEach((element: any) => {
      if (element.itemcode === itemcode) {
        element.quantity = Number(quantity);
      }
      // this.totalValues = this.totalValues + (element.quantity * element.price)
    });

  }

  // receiptTotal(event: any) {
  //   this.const_data.forEach((element: any) => {
  //     this.totalSum = this.totalValues - (this.totalValues * (event.srcElement.value / 100))
  //   });
  // }

  // onWillDismiss(event: Event) {
  //   const ev = event as CustomEvent<OverlayEventDetail<string>>;
  //   if (ev.detail.role === 'confirm') {
  //   }
  // }
  cancel_1() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Save Data',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'No';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Yes';
          },
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }
  save(whscode: any) {
    var const_add = {};
    
    const_add = {
      whsCode: whscode,
      cardcode: this.myControlCardCode.value,
      cardname: this.formGroup.getRawValue().cardname,
      receiptdetails: this.const_data
    }
    this._data.post(this.currentUser.ip + this.API_RECEIPT, const_add).subscribe(res => {
      this._data.showSaveSuccess();
    })
    this.const_data = [];
    this.formGroup.reset();
    return this.modal.dismiss(this.const_data, 'confirm');
  }
  // async openModalHistoryReceipt() {
  //   const modal = await this.modalCtrl.create({
  //     component: HistoryReceiptComponent,
  //   });
  //   modal.present();

  //   const { data, role } = await modal.onWillDismiss();

  //   if (role === 'confirm') {
  //     // this.message = `Hello, ${data}!`;
  //   }
  // }
  public openHistoryItem(): void {
    this.navCtrl.navigateForward([receipt.receiptHistory]);
  }
  autocompateCardCode() {
    this.filteredOptionsCardCode = this.myControlCardCode.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filterCardCode(state) : this.const_bp.data.slice())),
    );
  }
  private _filterCardCode(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.const_bp.data.filter((state: any) => state.cardname.toLowerCase().includes(filterValue));
  }
  onSelectionChange($event: any) {
    const result = this.const_bp.data.find((x: any) => {
      return x.cardcode === $event.option.value
    })
    this.formGroup.controls["cardname"].setValue(result?.cardname);
    this.formGroup.controls['cardname'].disable();
  }
}


