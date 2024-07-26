import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DateAdapter } from '@angular/material/core';

import { IonModal, NavController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

import { DatePipe } from '@angular/common';

import { OrderItemsComponent } from '../order-items/order-items.component';
import { home, order } from 'src/app/services/link-id.index';
import { TableComponent } from '../table/table.component';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { UrlConstants } from 'src/app/commons/UrlConstants';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-order-main',
  templateUrl: './order-main.page.html',
  styleUrls: ['./order-main.page.scss'],
})
export class OrderMainPage implements OnInit {
  // Avariable
  Loading = true;
  // API
  API_Table: string = '/table';
  // Object
  const_table: any = [];
  currentUser: any = {};

  constructor(private _data: DataService,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private pdfGenerator: PDFGenerator,
    private dateAdapter: DateAdapter<Date>,
    private navCtrl: NavController,
    private authService: AuthService ) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy   
    this.currentUser = this.authService.getParseTokenUser();
    this.loadDataTable();
  }

  ngOnInit(): void {
  }

  loadDataTable() {
    this.Loading = false;
    this._data.get(this.currentUser.ip + this.API_Table).subscribe(x => {
      this.setDataTable_Obj(x || []);
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
      console.log(error);
    });
  }
  setDataTable_Obj(data: any) {
    this.const_table = data?.data;
  }

  public openDetailItem(id: any): void {
    this.navCtrl.navigateForward([order.orderTableDetail, id]);
  }

  async openModalTable() {
    const modal = await this.modalCtrl.create({
      component: TableComponent,
      componentProps: {
        // data: this.const_table
      }
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.const_table = data;
      this.loadDataTable();
    }
    setTimeout(() => {
      this.loadDataTable();
    }, 1000);
  }



  // @ViewChild(IonModal) modal!: IonModal;
  // // @ViewChild('valuesinput') valuesinput!: { value: any; };

  // // formGroup!: FormGroup;
  // public Order: any;
  // public Table: any;
  // // nowDate = new Date();
  // headerMenu = '';
  // editForm = false;
  // // const_data: any = {};
  // const_exp: any = {};
  // item_table: any;
  // valueForm: any = '';
  // filterTerm!: string;
  // // totalValues = 0;
  // // totalSum = 0;
  // // change = 0;
  // // discount = 0;
  // API_Order: string = '/order';
  // API_Order_GETDATE: string = '/order/mapTableOrderDetails/';
  // API_Table: string = '/table';
  // // API_NXT_WhsItem: string = '/viewnxt/whsitem';
  // // public order: any = {};
  // Loading = true;
  // // order_details: any = [];
  // date: any;
  // formGroupInLine!: FormGroup;
  // quantity = 1;
  // // product_price: any;
  // // send = 0;
  // // warehouse: any = {};
  // _nxt: any = {};
  // // API_WAREHOUSE: string = '/warehouse';
  // // content: any;
  // panelOpenState = false;
  // BASE_SERVERS: any = UrlConstants.BASE_SERVER + '/';

  // constructor(private _data: DataService,
  //   private formBuilder: FormBuilder,
  //   private modalCtrl: ModalController,
  //   private pdfGenerator: PDFGenerator,
  //   private dateAdapter: DateAdapter<Date>,
  //   private navCtrl: NavController) {
  //   this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy    
  // }

  // ngOnInit() {
  //   // this.createForm();
  //   // this.formGroup.reset();
  //   // this.loadDataTable();
  //   // // this.loadData();
  //   // this.loadDataWarehouse();
  // }

  // loadData(day: any, month: any, year: any) {
  //   this.Loading = false;
  //   this._data.post(this.API_Order_GETDATE, { day: day.toString(), month: month.toString(), year: year.toString() }).subscribe(x => {
  //     this.Order = x || [];
  //     this.Loading = true;
  //   }, (error) => {
  //     this.Loading = true;
  //     console.log(error);
  //   });

  // }

  // // loadDataWarehouse() {
  // //   this.Loading = false;
  // //   this._data.get(this.API_WAREHOUSE).subscribe(x => {
  // //     this.warehouse = x || [];
  // //     this.Loading = true;
  // //   }, (error) => {
  // //     this.Loading = true;
  // //     console.log(error);
  // //   });
  // // }

  // // btnRefresh() {
  // //   this.Loading = false;
  // //   this._data.get(this.API_Order).subscribe(x => {
  // //     this.Order = x || [];
  // //     this.Loading = true;
  // //   }, (error) => {
  // //     this.Loading = true;
  // //     console.log(error);
  // //   });
  // // }

  // loadDataTable() {
  //   this.Loading = false;
  //   this._data.get(this.API_Table).subscribe(x => {
  //     this.Table = x || [];
  //     this.Loading = true;
  //   }, (error) => {
  //     this.Loading = true;
  //     console.log(error);
  //   });
  // }
  // changeDate(event: any) {
  //   var days = '';
  //   var months = '';
  //   var years = '';
  //   this.date = moment(event.value);
  //   days = this.date.format('DD');
  //   months = this.date.format('MM');
  //   years = this.date.format('YYYY');
  //   this.loadData(days, months, years);
  //   console.log(this.Order);


  //   setTimeout(() => {
  //     this.mapTableToData();
  //   }, 1000);
  //   // this.loaddataCircle(days, months, years);
  // }

  // mapTableToData() {
  //   // this.loadData();
  //   var const_example: any = [];
  //   this.const_exp = {};

  //   this.Table?.data?.map((x: any) => { x.child = [] });

  //   this.Table?.data?.forEach((element: any) => {
  //     this.Order?.data.forEach((element1: any) => {
  //       if (element.tablenumber == element1.tablenumber) {
  //         element.child.push(element1);
  //       }
  //     });
  //   });

  //   this.Table?.data?.forEach((x: any) => {
  //     if (x.child.length > 0) {
  //       x.show = true;
  //     } else { x.show = false }
  //   });


  // }

  // cancel() {
  //   return this.modal.dismiss(null, 'cancel');
  //   // this.orderDetails = [];
  // }

  // public openAddItem(): void {
  //   this.navCtrl.navigateForward([order.orderAdd]);
  // }

  // // confirm(tablename: any, tablenumber: any, totalValues = 0, discount = 0, totalSum = 0, product_price: any, send = 0, form: any) {
  // //   this.const_data = {};
  // //   this.const_data.tablename = tablename;
  // //   this.const_data.tablenumber = tablenumber;
  // //   this.const_data.docDate = this.nowDate;

  // //   this.const_data.total = totalValues == undefined || totalValues == null ? 0 : Number(totalValues.toString().replace(/,/g, ""));
  // //   this.const_data.discount = discount == null || discount == undefined ? 0 : Number(discount);

  // //   this.const_data.doctotal = totalSum == null || totalSum == undefined ? 0 : Number(totalSum.toString().replace(/,/g, ""));
  // //   this.const_data.customerpay = product_price == null || product_price == undefined ? '0' : Number(product_price.replace(/,/g, "")).toString();
  // //   this.const_data.refund = send == null || send == undefined ? 0 : Number(send.toString().replace(/,/g, ""));
  // //   // this.const_data.status = 'save';
  // //   // this.const_data.status = form.status == '1' ? true : false;

  // //   // this.const_data.cardCode = this.valuesinput.value;
  // //   // this.const_data.cardName = this.formGroup.getRawValue().cardname;

  // //   // this.const_data.type = 'T';
  // //   this.const_data.orderDetails = this.order_details;

  // //   this._data.post(this.API_Order, this.const_data).subscribe(res => {
  // //     this._data.showSaveSuccess();
  // //   });
  // //   this.modal.dismiss(this.name, 'confirm');
  // //   this.order_details = [];
  // //   this.mapTableToData();
  // // }
  // // onWillDismiss(event: Event) {
  // //   const ev = event as CustomEvent<OverlayEventDetail<string>>;

  // //   if (ev.detail.role === 'confirm') {
  // //     this.formGroup.reset();
  // //   } else {
  // //     this._data.showNotSuccess();
  // //   }
  // // }
  // public openItem(itemId: number): void {
  //   this.navCtrl.navigateForward([home.order, itemId]);
  // }
  // // createForm() {
  // //   this.formGroup = this.formBuilder.group({
  // //     'tablename': [null],
  // //     'tablenumber': [null, Validators.required],
  // //     'docdate': [Date],
  // //     'remarks': [null],
  // //     'group': [null],
  // //     // 'status': [null],
  // //     'phone': [0],
  // //     'total': [0],
  // //     'discount': [0],
  // //     'doctotal': [0],
  // //     'customerpay': [0],
  // //     'refund': [0],
  // //     'vat': [0],
  // //     'creator': [null]
  // //   });
  // //   // this.formGroup.controls['postingdate'].disable();
  // // }
  // // clearOrderDetailAdd() {
  // //   this.order_details = [];
  // // }
  // // getdata(value: any) {
  // //   this.order = value || [];
  // // }
  // // onSubmit(values: any) {
  // //   this.const_data.push(values);
  // // }
  // // async openModal() {
  // //   this.loadDataWarehouse();
  // //   const modal = await this.modalCtrl.create({
  // //     component: OrderItemsComponent,
  // //     componentProps: {
  // //       data: this.order_details
  // //     }
  // //   });
  // //   modal.present();

  // //   const { data, role } = await modal.onWillDismiss();

  // //   if (role === 'confirm') {
  // //     this.order_details = data;
  // //   }

  // //   this.totalValues = 0;

  // //   this.order_details.forEach((element: any) => {
  // //     // this.totalValues = this.totalValues+(this.quantity *element.price)
  // //     this.totalValues = this.totalValues + (this.quantity * element.price)
  // //     // this.receiptTotal(0);
  // //     this.discountTotal(0);
  // //   });
  // //   // this.formGroup.controls['postingdate'].disable();
  // // }
  // //-----------------------------------------------------------------------
  // // total(event1: any, quantity: any, itemcode: any) {
  // //   this.totalValues = 0;
  // //   this.order_details.forEach((element: any) => {
  // //     if (element.itemcode === itemcode) {
  // //       element.quantity = Number(quantity);
  // //       this.discountTotal(0);
  // //       this.discountTotal('');
  // //     }
  // //     this.totalValues = this.totalValues + (element.quantity * element.price)
  // //     this.totalSum = this.totalValues
  // //   });

  // // }

  // // changeWhsCode(event: any, itemcode: any) {
  // //   this._data.post(this.API_NXT_WhsItem, { WhsCode: event.srcElement.value, ItemCode: itemcode }).subscribe(x => {
  // //     this.setValueNXT(x || []);
  // //   })
  // //   console.log(this._nxt.quantity);

  // //   setTimeout(() => {
  // //     this.order_details.forEach((element: any) => {
  // //       if (element.itemcode === itemcode) {
  // //         element.whscode = event.srcElement.value;
  // //         element.ton = this._nxt.quantity == '' || this._nxt.quantity == null || this._nxt.quantity == undefined ? 0 : this._nxt.quantity;
  // //         if (this._nxt.quantity != '' || this._nxt.quantity != null || this._nxt.quantity != undefined) {
  // //           if (Number(this._nxt.quantity) <= 0) {
  // //             element.class = 'card-iten-darkgray'
  // //           } else {
  // //             element.class = 'card-iten-white'
  // //           }
  // //         } else {
  // //           element.class = 'card-iten-darkgray'
  // //         }
  // //       }
  // //     });
  // //   }, 1000);
  // // }

  // // setValueNXT(data: any) {
  // //   this._nxt = data?.data;
  // // }

  // // CommaFormatted(event: any) {
  // //   if (event.which >= 37 && event.which <= 40) return;

  // //   if (this.product_price) {
  // //     this.product_price = String(this.product_price);
  // //     this.product_price = this.product_price.replace(/\D/g, "")
  // //       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // //   }
  // // }


  // // numberCheck(args: any) {
  // //   if (args.key === 'e' || args.key === '+' || args.key === '-') {
  // //     return false;
  // //   } else {
  // //     return true;
  // //   }
  // // }
  // // product = '';
  // // product_num = 0;

  // // receiptTotal() {
  // //   this.product = this.product_price.replace(/,/g, "");
  // //   this.product_num = Number(this.product);
  // //   if (this.product_num == 0) {
  // //     this.totalSum = this.totalValues
  // //   }
  // //   else {
  // //     this.order_details.forEach((element: any) => {
  // //       this.send = this.product_num - this.totalSum
  // //     });
  // //   }
  // // }


  // // discountTotal(event: any) {
  // //   if (event == 0) {
  // //     this.totalSum = this.totalValues
  // //   } else {
  // //     this.order_details.forEach((element: any) => {
  // //       this.totalSum = this.totalValues - (this.totalValues * (event.srcElement.value / 100))
  // //     });
  // //   }
  // // }

  // // async openModalTable() {
  // //   const modal = await this.modalCtrl.create({
  // //     component: TableComponent,
  // //     componentProps: {
  // //       data: this.item_table
  // //     }
  // //   });
  // //   modal.present();
  // //   const { data, role } = await modal.onWillDismiss();
  // //   if (role === 'confirm') {
  // //     this.item_table = data;
  // //     this.loadDataTable();
  // //   }
  // // }
  // // downloadInvoice() {
  // //   this.content = document.getElementById('PrintInvoice')!.innerHTML;
  // //   let options = {
  // //     documentSize: 'A4',
  // //     type: 'share',
  // //     // landscape: 'portrait',
  // //     fileName: 'Order-Invoice.pdf'
  // //   };
  // //   this.pdfGenerator.fromData(this.content, options)
  // //     .then((base64) => {
  // //       console.log('OK', base64);
  // //     }).catch((error) => {
  // //       console.log('error', error);
  // //     });
  // //   return this.modal.dismiss(null, 'cancel');
  // // }
}
