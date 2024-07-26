import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PosAdditemsComponent } from '../pos-additems/pos-additems.component';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { DataService } from 'src/app/services/data.service';

// import { FoodService } from 'src/app/service/food.service';
// import { DrinkService } from 'src/app/service/drink.service';

import { IonModal, AlertController, NavController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
// import { ReceiptPOComponent } from 'src/app/goods/receipt-po/receipt-po.component';
import { HistoryPage } from '../history/history.page';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { UrlConstants } from 'src/app/commons/UrlConstants';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-pos',
  templateUrl: './pos.page.html',
  styleUrls: ['./pos.page.scss'],
})
export class PosPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('valuesinput') valuesinput!: { value: any; };
  message = 'This modal example uses the modalController to present and dismiss modals.';
  content: any;
  index: any;
  arr: any;
  formGroup!: FormGroup;

  Loading = true;
  const_bp: any = {};
  API_BP: string = '/business';
  const_balance: any = {};
  public configsetting: any = {};
  const_data: any = {};
  pos_details: any;
  totalValues = 0
  totalSum = 0
  discount = 0;
  quantity = 1;
  paid = 0;
  change = 0;
  product_price = '';
  send = 0;
  public pos: any = {};
  API: string = '/pos';
  name!: string;
  index_1: any = 3;

  poscode: any
  cardname: any
  discoutThanhToan: any;

  API_Item: string = '/items'
  public Item: any = {};
  warehouse: any = {};
  currentUser: any = {};
  _nxt: any = {};
  API_WAREHOUSE: string = '/warehouse';
  API_NXT_WhsItem: string = '/viewnxt/whsitem';
  API_CONFIGSETTING: string = '/configsetting';

  // paymentBillStatus= false;

  // autocomplete cardcode
  myControlCardCode = new FormControl('');
  filteredOptionsCardCode!: Observable<any[]>;

  BASE_SERVERS: any = UrlConstants.BASE_SERVER + '/';

  constructor(private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private pdfGenerator: PDFGenerator,
    private _data: DataService,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private navControl: NavController,
    private authService: AuthService
    // private food: FoodService,private drink: DrinkService
  ) { }



  // product = '';
  // product_num = 0;
  ngOnInit() {
    this.currentUser = this.authService.getParseTokenUser();
    this.pos_details = [];
    this.loaddata_bp();
    this.loadDataWarehouse();
    this.loadDataConfigSettings();
  }

  loadDataWarehouse() {
    this.Loading = false;
    this._data.get(this.currentUser.ip + this.API_WAREHOUSE).subscribe(x => {
      this.warehouse = x || [];
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
      console.log(error);
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

  downloadInvoice() {
    this.content = document.getElementById('PrintInvoice')!.innerHTML;
    let options = {
      documentSize: 'A4',
      type: 'share',
      // landscape: 'portrait',
      fileName: 'Order-Invoice.pdf'
    };
    this.pdfGenerator.fromData(this.content, options)
      .then((base64) => {
        console.log('OK', base64);
      }).catch((error) => {
        console.log('error', error);
      });

    // this.paymentBillStatus = true;
  }

  confirm(poscode: any, cardname: any, totalValues = 0, discount = 0, totalSum = 0, product_price: any, send = 0) {
    this.const_data = {};
    this.const_data.poscode = 'poscode';
    this.const_data.cardame = cardname;


    this.const_data.total = totalValues;
    this.const_data.discount = this.discoutThanhToan == null || this.discoutThanhToan == undefined || this.discoutThanhToan == '' ? 0 : Number(this.discoutThanhToan);

    this.const_data.doctotal = totalSum;
    this.const_data.customerpay = product_price;
    this.const_data.refund = send;
    // this.const_data.cardCode = this.valuesinput.value;

    this.const_data.type = 'T';
    this.const_data.posDetails = this.pos_details;
    this._data.post(this.currentUser.ip + this.API, this.const_data).subscribe(res => {
      this._data.showSaveSuccess();
    });
    this.modal.dismiss(this.name, 'confirm');
    this.pos_details = [];
  }

  UpdateItem(values: any) {
    const itemId = +this.route.snapshot.params['id'];
    var const_update = {}
    console.log(values)
    this._data.put(this.currentUser.ip + this.API_Item + `/${itemId}`, values).subscribe(res => {
      this._data.showUpdateSuccess(values.itemcode);
    })
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'poscode': [null],
      'cardname': [null],
      'docdate': [new Date()],
      'total': [0],
      'discount': [0],
      'doctotal': [0],
      'customerpay': [0],
      'refund': [0],


    });
  }

  loaddata_bp() {
    this.Loading = false;
    this._data.get(this.currentUser.ip + this.API_BP).subscribe(x => {
      this.getListBP(x || []);
      this.const_bp = x || [];
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
      console.log(error);
    });

  }

  autocompateCardCode() {
    this.filteredOptionsCardCode = this.myControlCardCode.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filterCardCode(state) : this.const_bp.data.slice())),
    );
  }
  getListBP(data: any) {
    this.const_bp = data;
    this.autocompateCardCode();
  }

  private _filterCardCode(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.const_bp.data.filter((state: { cardcode: string; }) => state.cardcode.toLowerCase().includes(filterValue));
  }

  onSelectionChange($event: any) {
    const result = this.const_bp.data.find((x: { cardcode: any; }) => {
      return x.cardcode === $event.option.value
    })

    const resultBalance = this.const_balance.data.find((x: { cardcode: any; }) => {
      return x.cardcode === $event.option.value
    });

    this.formGroup.controls["cardname"].setValue(result?.cardname);
    // this.formGroup.controls['olddebt'].setValue(resultBalance?.balance);
    // this.formGroup.controls['liabilities'].setValue(resultBalance?.balance);

    // this.formGroup.controls['cardname'].disable();
    // this.formGroup.controls['totalfirst'].disable();
    // this.formGroup.controls['totalafter'].disable();
    // this.formGroup.controls['olddebt'].disable();
    // this.formGroup.controls['liabilities'].disable();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Notification',
      subHeader: 'CardCode invalid !!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: PosAdditemsComponent,
      componentProps: {
        data: this.pos_details
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.pos_details = data;
    }
    this.totalValues = 0;
    this.pos_details.forEach((element: any) => {
      this.totalValues = this.totalValues + (this.quantity * element.price)
      this.discountTotal(0);
    });
  }
  //-----------------------------------------------------------------------
  total(event1: any, quantity: any, itemcode: any) {
    this.totalValues = 0;
    this.pos_details.forEach((element: any) => {
      if (element.itemcode === itemcode) {
        element.quantity = Number(quantity);
        this.discountTotal(0);
        this.discountTotal('');
      }
      this.totalValues = Number(this.totalValues + (element.quantity * element.price))
      this.totalSum = this.totalValues;
    });

  }

  changeWhsCode(event: any, itemcode: any) {
    this._data.post(this.currentUser.ip + this.API_NXT_WhsItem, { WhsCode: event.srcElement.value, ItemCode: itemcode }).subscribe(x => {
      this.setValueNXT(x || []);
    })
    setTimeout(() => {
      this.pos_details.forEach((element: any) => {
        if (element.itemcode === itemcode) {
          element.whscode = event.srcElement.value;
          element.ton = this._nxt.quantity == '' || this._nxt.quantity == null || this._nxt.quantity == undefined ? 0 : this._nxt.quantity;
          if (this._nxt.quantity != '' || this._nxt.quantity != null || this._nxt.quantity != undefined) {
            if (Number(this._nxt.quantity) <= 0) {
              element.class = 'card-iten-darkgray'
            } else {
              element.class = 'card-iten-white'
            }
          } else {
            element.class = 'card-iten-darkgray'
          }
        }
      });
    }, 1000);
  }

  setValueNXT(data: any) {
    this._nxt = data?.data;
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
  product = '';
  product_num = 0;

  receiptTotal() {
    this.product = this.product_price.replace(/,/g, "");
    this.product_num = Number(this.product);
    if (this.product_num == 0) {
      this.totalSum = this.totalValues
    }
    else {
      this.pos_details.forEach((element: any) => {
        this.send = this.product_num - this.totalSum
      });
    }

    //  this.totalSum = this.totalValues - (this.totalValues * this.discount) 
  }

  discountTotal(event: any) {
    this.discoutThanhToan = event?.srcElement?.value.toString();
    if (event == 0) {
      this.totalSum = this.totalValues
    } else {
      this.pos_details.forEach((element: any) => {
        this.totalSum = this.totalValues - (this.totalValues * (event.srcElement.value / 100))
      });
    }

    //  this.totalSum = this.totalValues - (this.totalValues * this.discount) 

  }

  changeMoney(event1: any) {
    this.pos_details.forEach((element: any) => {
      this.change = (event1.srcElement.value) - this.totalSum
    });
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
  cancelCategories() {
    this.modal.dismiss(null, 'cancel');
  }

  public openItem(): void {
    this.navControl.navigateForward(['centers/tabs/history']);
  }

  btnCreate() {
    this.index = -1 + this.index_1++;
  }

  testPrint() {
  }

}
