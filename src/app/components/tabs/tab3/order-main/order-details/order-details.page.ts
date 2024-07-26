import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { IonModal, ModalController, NavController, AlertController } from '@ionic/angular';


import { OrderItemsComponent } from '../../order-items/order-items.component';
import { UrlConstants } from 'src/app/commons/UrlConstants';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { ModalDetailsPaymentYesnoComponent } from './modal-details-payment-yesno/modal-details-payment-yesno.component';
import { ShowBillComponent } from './show-bill/show-bill.component';
import { map, Observable, startWith } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ShowBillWebComponent } from './show-bill-web/show-bill-web.component';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  @ViewChild('valuesinput') valuesinput: any;
  // public order: any;
  order_details: any = [];
  // const_items: any = {};
  public order: any = {};
  const_bp: any = {};
  _nxt: any = {};
  currentUser: any = {};
  formGroup!: FormGroup;
  formGroup1!: FormGroup;

  formGroupSelectOption!: FormGroup;
  valueForm: any = '';
  // urlSERVER: any = UrlConstants.BASE_SERVER+'/';
  dynamictype: string = "number";
  API: string = '/order';
  // API_ITEMS: string = '/items';
  API_Order: string = '/order';
  API_Order_Detail: string = '/orderDetail';
  API_Table: string = '/table';
  API_BP: string = '/business';
  API_UpdateCreateOrderDetail: string = '/orderDetail/updateandinsert';
  BASE_SERVERS: any = UrlConstants.BASE_SERVER + '/';
  API_NXT_WhsItem: string = '/viewnxt/whsitem';
  imgDefault = '../../../../../../assets/images/imgdefault.jpeg';

  product_price: any;
  Loading = true;
  values: any
  public Order: any;
  public Table: any;
  content: any;

  headerMenu = '';
  name!: string;
  filterTerm!: string;
  totalValues = 0;
  totalSum = 0;
  change = 0;
  discount = 0;
  date: any;
  formGroupInLine!: FormGroup;
  quantity = 1;
  send = 0;
  warehouse: any = {};
  items: any = {};
  API_WAREHOUSE: string = '/warehouse';
  API_ITEMS: string = '/items';
  showPayment: any = false;
  statusPrint: string = '';


  // autocomplete cardcode
  myControlCardCode = new FormControl('');
  filteredOptionsCardCode: Observable<any[]> | undefined;

  constructor(private route: ActivatedRoute,
    private _data: DataService,
    private formBuilder: FormBuilder, private navCtrl: NavController,
    private pdfGenerator: PDFGenerator,
    private modalCtrl: ModalController, private authService: AuthService) {
    this.currentUser = this.authService.getParseTokenUser();
    this.loadDataWarehouse();
  }

  ngOnInit() {
    this.currentUser = this.authService.getParseTokenUser();
    this.loaddata_bp();
    this.createForm1();
    this.loaddata();
    this.loaddataItems();

    this.createFormSelection();

    this.order = {};
  }
  createForm1() {
    this.formGroup1 = this.formBuilder.group({
      'cardcode': [null],
      'cardname': [null]
    });
    this.formGroup1.controls['cardname'].disable();
  }

  confirm(tablename: any, tablenumber: any, totalValues = 0, discount = 0, totalSum = 0, product_price: any, send = 0) {

    // this.const_data.cardCode = this.valuesinput.value;
    // this.const_data.cardName = this.formGroup.getRawValue().cardname;

    // this.const_data.type = 'T';


    // this._data.post(this.API_Order, this.const_data).subscribe(res => {
    //   this._data.showSaveSuccess();
    // });

    this.order_details = [];
  }

  loaddata() {
    this.Loading = false;
    this.createForm();
    const itemId = +this.route.snapshot.params['id'];
    if (itemId != null || itemId != undefined) {
      this._data.get(this.currentUser.ip + this.API + `/${itemId}`).subscribe(x => {
        this.order = x || [];
        this.setValue(this.order?.data);
        this.Loading = true;
      }, (error) => {
        this.Loading = true;
      });
    } else {
      this.Loading = true;
    }
  }

  loaddataItems() {
    this.Loading = false;
    this._data.get(this.currentUser.ip + this.API_ITEMS).subscribe(x => {
      this.items = x || [];
      this.setValueItems(x || []);
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
    });
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
    //  loaddata()
  }

  setValueItems(data: any) {
    this.items = data?.data
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

  setValue(values: any) {
    // this.loadDataWarehouse();
    setTimeout(() => {
      this.Loading = false;
      this.formGroup.controls["tablename"].setValue(values.tablename);
      this.formGroup.controls["tablenumber"].setValue(values.tablenumber);
      this.formGroup.controls["remarks"].setValue(values.remarks);
      this.formGroup.controls["cardcode"].setValue(values?.cardcode);
      this.formGroup.controls["cardname"].setValue(values?.cardname);
      this.formGroup.controls["docdate"].setValue(values.docdate);
      this.formGroup.controls["total"].setValue(values.total.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      this.formGroup.controls["discount"].setValue(values.discout);
      this.formGroup.controls["discountTP"].setValue(
        // values.discout
        ((
          Number(values.total)
          *
          Number(values.discout)
        ) / 100)

          .toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
      this.formGroup.controls["doctotal"].setValue(values.doctotal.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      this.formGroup.controls["customerpay"].setValue(values.customerpay.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      this.formGroup.controls["refund"].setValue(values.refund.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      // this.formGroup.controls["status"].setValue(values.status == true ? '1' : '0');

      // this.formGroup.disable();
      // this.formGroup.controls["total"].disable();

      this.order?.data?.orderDetails.map((x: any) => x.hide = true);

      this.formGroup.controls["tablename"].disable();
      this.formGroup.controls["tablenumber"].disable();

      if (values.viewpayment == 'off') {
        this.showPayment = true;
        this.formGroup.disable();
      } else {
        this.showPayment = false;
      }
      // this.formGroupSelectOption.controls["whscodeoption"].setValue(values.whscode);

      this.order?.data?.orderDetails.forEach((element: any) => {
        this.items.forEach((element1: any) => {
          if (element.itemcode == element1.itemcode) {
            this.loadDataWhsCode(element1.whscode, element1.itemcode);
            element.image = element1.image;
          }
        });
      });
    }, 1000);
    setTimeout(() => {
      this.Loading = true;
    }, 1000);
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'tablename': [null],
      'tablenumber': [null, Validators.required],
      'docdate': [Date],
      'remarks': [null],
      'group': [null, Validators.required],
      // 'status': [0, Validators.required],
      'phone': [0],
      'total': [0],
      'discount': [0],
      'discountTP': [0],
      'doctotal': [0],
      'customerpay': [0],
      'refund': [0],
      'vat': [0],
      'creator': [null],
      'cardcode': [null],
      'cardname': [null]
    });
    // this.formGroup.controls['postingdate'].disable();
    this.formGroup.controls['cardname'].disable();
  }
  createFormSelection() {
    this.formGroupSelectOption = this.formBuilder.group({
      'whscodeoption': [null],

    });
    // this.formGroup.controls['postingdate'].disable();
  }

  editForm(form: any) {
    const itemId = +this.route.snapshot.params['id'];

    var const_result: any = {};
    const_result.tablename = this.formGroup.getRawValue().tablename;
    const_result.remarks = this.formGroup.getRawValue().remarks;
    const_result.cardcode = this.myControlCardCode.value;

    // const_result.cardname = this.formGroup1.getRawValue().cardname;
    const_result.cardname = this.myControlCardCode.value === null || this.myControlCardCode.value === undefined || this.myControlCardCode.value === '' ? '' : this.const_bp?.data.find((e: any) => e.cardcode == this.myControlCardCode.value ? e.cardname : '').cardname;
    const_result.tablenumber = this.formGroup.getRawValue().tablenumber;
    const_result.total = Number(this.formGroup.getRawValue().total.replace(/,/g, ""));
    const_result.discount = Number(this.formGroup.getRawValue().discount);
    const_result.doctotal = Number(this.formGroup.getRawValue().doctotal.replace(/,/g, ""));
    // const_result.customerpay = Number(this.formGroup.getRawValue().customerpay.replace(/,/g, "")).toString();
    const_result.refund = Number(this.formGroup.getRawValue().refund.replace(/,/g, ""));
    const_result.viewpayment = 'save';
    // status: form.status == '1' ? true : false,
    // orderDetails: this.order_details
    // }

    if (this.statusPrint == 'TT') {
      if (const_result.discount == 0) {
        const_result.customerpay = const_result.doctotal.toString();
      } else {
        const_result.customerpay = Number(this.formGroup.getRawValue().customerpay.replace(/,/g, "")).toString();
      }
    }

    this._data.put(this.currentUser.ip + this.API + `/${itemId}`, const_result).subscribe(res => {
      this._data.showUpdateSuccess(const_result.tablenumber);
    });


    this.order?.data?.orderDetails.forEach((element: any) => {
      var const_orderDetails: any = {};
      const_orderDetails = {
        idorder: itemId,
        itemcode: element.itemcode,
        itemname: element.itemname,
        quantity: Number(element.quantity),
        price: Number(element.price),
        tax: 0,
        whscode: element.whscode,
        status: 'save',
      }
      element.id = element.ID || element.id;
      if (element.status != 'save') {
        this._data.put(this.currentUser.ip + this.API_UpdateCreateOrderDetail + `/${itemId}`, const_orderDetails).subscribe(res => {
          this._data.showUpdateSuccess(const_orderDetails.itemcode);
        });
      } else {
        this._data.put(this.currentUser.ip + this.API_Order_Detail + `/${element.id}`, const_orderDetails).subscribe(res => {
          this._data.showUpdateSuccess(const_result.tablenumber);
        });
      }
    });
  }

  saveBill(item: any, form: any) {
    const itemId = +this.route.snapshot.params['id'];

    var const_result_header: any = {}
    const_result_header.tablename = this.formGroup.getRawValue().tablename;
    const_result_header.tablenumber = this.formGroup.getRawValue().tablenumber;
    const_result_header.remarks = this.formGroup.getRawValue().remarks;
    const_result_header.cardcode = this.myControlCardCode.value;
    const_result_header.cardname = this.myControlCardCode.value === null || this.myControlCardCode.value === undefined || this.myControlCardCode.value === '' ? '' : this.const_bp?.data.find((e: any) => e.cardcode == this.myControlCardCode.value ? e.cardname : '').cardname;
    const_result_header.total = Number(this.formGroup.getRawValue().total.replace(/,/g, ""));
    const_result_header.discount = Number(this.formGroup.getRawValue().discount);
    const_result_header.doctotal = Number(this.formGroup.getRawValue().doctotal.replace(/,/g, ""));
    // const_result_header.customerpay = Number(this.formGroup.getRawValue().customerpay.replace(/,/g, "")).toString();
    const_result_header.refund = Number(this.formGroup.getRawValue().refund.replace(/,/g, ""));


    if (this.statusPrint == 'TT') {
      if (const_result_header.discount == 0) {
        const_result_header.customerpay = const_result_header.doctotal.toString();
      } else {
        const_result_header.customerpay = Number(this.formGroup.getRawValue().customerpay.replace(/,/g, "")).toString();
      }
    }


    var const_result = {
      idorder: itemId,
      itemcode: item.itemcode,
      itemname: item.itemname,
      quantity: Number(item.quantity),
      price: Number(item.price),
      tax: 0,
      whscode: item.whscode,
      status: 'save'
    }

    this._data.put(this.currentUser.ip + this.API + `/${itemId}`, const_result_header).subscribe(res => {
      this._data.showUpdateSuccess(const_result_header.tablenumber);
    });

    this._data.put(this.currentUser.ip + this.API_UpdateCreateOrderDetail + `/${itemId}`, const_result).subscribe(res => {
      this._data.showUpdateSuccess(const_result.itemcode);
    });
    this.loaddata();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: OrderItemsComponent,
      componentProps: {
        data: this.order?.data?.orderDetails
      },
      backdropDismiss: false
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    // if (role === 'confirm') {}
    var total = 0;
    var doctotal = 0;
    this.order_details = data;

    this.order?.data?.orderDetails.forEach((element: any) => {
      total = total + (element.quantity * element.price);
    });
    this.formGroup.controls["total"].setValue(total.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));

    doctotal = Number(total) - (Number(total) * (Number(this.formGroup.getRawValue().discount) / 100));

    this.formGroup.controls["doctotal"].setValue(doctotal.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    var NumCus;
    NumCus = Number((this.formGroup.getRawValue().customerpay).split(',').join(''));

    this.formGroup.controls["discountTP"].setValue(
      // values.discout
      ((
        Number(total)
        *
        Number(this.formGroup.getRawValue().discount)
      ) / 100)

        .toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );

    this.formGroupSelectOption.controls["whscodeoption"].setValue('01');
    // this.formGroup.controls["refund"].setValue(NumCus - doctotal);

    // this.formGroup.controls["total"].disable();
    // this.formGroup.controls["doctotal"].disable();
    // this.formGroup.controls["refund"].disable();

  }
  changeRefun(event: any) {
    this.formGroup.controls["refund"].setValue((Number(event.srcElement.value.replace(/,/g, "")) - Number(this.formGroup.value.doctotal.replace(/,/g, ""))).toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }
  changeDiscount(event: any) {
    this.formGroup.controls["doctotal"].setValue(
      (Number(this.formGroup.value.total.replace(/,/g, "")) - (
        Number(this.formGroup.value.total.replace(/,/g, ""))
        *
        Number(event.srcElement.value)
      ) / 100)
        .toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );

    this.formGroup.controls["discountTP"].setValue(
      // values.discout
      ((
        (Number(this.formGroup.value.total.replace(/,/g, "")))
        *
        Number(this.formGroup.getRawValue().discount)
      ) / 100)

        .toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );

    this.formGroup.controls["refund"].setValue((Number(event.srcElement.value.replace(/,/g, "")) - Number(this.formGroup.value.doctotal.replace(/,/g, ""))).toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }
  changeQty(event: any, itemcode: string) {
    var total = 0;
    var doctotal = 0;
    this.order?.data?.orderDetails.forEach((element: any) => {
      if (element.itemcode == itemcode) {
        element.quantity = Number(event.srcElement.value);
      }
      total = total + (element.quantity * element.price);
    });

    this.formGroup.controls["total"].setValue(total);
    doctotal = Number(total) - (Number(total) * (Number(this.formGroup.getRawValue().discount) / 100));
    this.formGroup.controls["doctotal"].setValue(doctotal);
    var NumCus;
    NumCus = Number((this.formGroup.getRawValue().customerpay).split(',').join(''));
    // this.formGroup.controls["refund"].setValue(NumCus - doctotal);

    this.formGroup.controls["doctotal"].setValue(this.formGroup.getRawValue().doctotal.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    this.formGroup.controls["total"].setValue(this.formGroup.getRawValue().total.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    // this.formGroup.controls["refund"].setValue(this.formGroup.getRawValue().refund.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","))

    this.formGroup.controls["discountTP"].setValue(
      // values.discout
      ((
        (Number(this.formGroup.value.total.replace(/,/g, "")))
        *
        Number(this.formGroup.getRawValue().discount)
      ) / 100)

        .toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
  }
  paymentHiden() {
    this.showPayment = !this.showPayment;
  }

  loadDataWhsCode(whscode: any, itemcode: any) {
    this._data.post(this.currentUser.ip + this.API_NXT_WhsItem, { WhsCode: whscode, ItemCode: itemcode }).subscribe(x => {
      this.setValueNXT(x || []);
    })
  }

  changeWhsCode(event: any, itemcode: any) {
    this.loadDataWhsCode(event.srcElement.value, itemcode)
    setTimeout(() => {
      this.order?.data?.orderDetails.forEach((element: any) => {
        if (element.itemcode === itemcode) {
          element.whscode = event.srcElement.value;
          element.ton = this._nxt.quantity == '' || this._nxt.quantity == null || this._nxt.quantity == undefined ? 0 : this._nxt.quantity;
        }
      });
      // this.formGroup.controls["total"].enable();
      // this.formGroup.controls["doctotal"].enable();
      // this.formGroup.controls["refund"].enable();

      this.formGroup.controls["total"].setValue(this.formGroup.getRawValue().total.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      this.formGroup.controls["doctotal"].setValue(this.formGroup.getRawValue().doctotal.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      this.formGroup.controls["refund"].setValue(this.formGroup.getRawValue().refund.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));

      // this.formGroup.controls["total"].disable();
      // this.formGroup.controls["doctotal"].disable();
      // this.formGroup.controls["refund"].disable();
    }, 1000);

  }
  setValueNXT(data: any) {
    this._nxt = data?.data;
  }

  CommaFormatted(event: any) {
    if (event.which >= 37 && event.which <= 40) return;

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

  updateStatusThanhToan(form: any) {
    const itemId = +this.route.snapshot.params['id'];

    var const_result: any = {};
    const_result.tablename = this.formGroup.getRawValue().tablename;
    const_result.remarks = this.formGroup.getRawValue().remarks;
    const_result.cardcode = this.myControlCardCode.value;
    const_result.cardname = this.myControlCardCode.value === null || this.myControlCardCode.value === undefined || this.myControlCardCode.value === '' ? '' : this.const_bp?.data.find((e: any) => e.cardcode == this.myControlCardCode.value ? e.cardname : '').cardname;
    const_result.tablenumber = this.formGroup.getRawValue().tablenumber;
    const_result.total = Number(this.formGroup.getRawValue().total.replace(/,/g, ""));
    const_result.discount = Number(this.formGroup.getRawValue().discount);
    const_result.doctotal = Number(this.formGroup.getRawValue().doctotal.replace(/,/g, ""));
    // const_result.customerpay= Number(this.formGroup.getRawValue().customerpay.replace(/,/g, "")).toString();
    const_result.refund = Number(this.formGroup.getRawValue().refund.replace(/,/g, ""));
    const_result.viewpayment = 'off';
    // status: form.status == '1' ? true : false,
    // orderDetails: this.order_details


    if (this.statusPrint == 'TT') {
      if (const_result.discount == 0) {
        const_result.customerpay = const_result.doctotal.toString();
      } else {
        const_result.customerpay = Number(this.formGroup.getRawValue().customerpay.replace(/,/g, "")).toString();
      }
    }

    this._data.put(this.currentUser.ip + this.API + `/${itemId}`, const_result).subscribe(res => {
      this._data.showUpdateSuccess(const_result.tablenumber);
    });


    this.order?.data?.orderDetails.forEach((element: any) => {
      var const_orderDetails: any = {};
      const_orderDetails = {
        idorder: itemId,
        itemcode: element.itemcode,
        itemname: element.itemname,
        quantity: Number(element.quantity),
        price: Number(element.price),
        tax: 0,
        whscode: element.whscode,
        status: 'off',
      }
      element.id = element.ID || element.id;
      if (element.status != 'save') {
        this._data.put(this.currentUser.ip + this.API_UpdateCreateOrderDetail + `/${itemId}`, const_orderDetails).subscribe(res => {
          this._data.showUpdateSuccess(const_orderDetails.itemcode);
        });
      } else {
        this._data.put(this.currentUser.ip + this.API_Order_Detail + `/${element.id}`, const_orderDetails).subscribe(res => {
          this._data.showUpdateSuccess(const_result.tablenumber);
        });
      }
    });
    // const itemId = +this.route.snapshot.params['id'];

    // var const_result = {
    //   tablename: this.formGroup.getRawValue().tablename,
    //   tablenumber: this.formGroup.getRawValue().tablenumber,
    //   total: Number(this.formGroup.getRawValue().total.replace(/,/g, "")),
    //   discount: Number(this.formGroup.getRawValue().discount),
    //   doctotal: Number(this.formGroup.getRawValue().doctotal.replace(/,/g, "")),
    //   customerpay: Number(this.formGroup.getRawValue().customerpay.replace(/,/g, "")).toString(),
    //   refund: Number(this.formGroup.getRawValue().refund.replace(/,/g, "")),
    //   viewpayment: 'off'
    //   // orderDetails: this.order_details
    // }
    // this.order?.data?.orderDetails.forEach((element: any) => {
    //   element.id = 
    // });

    // this._data.put(this.API + `/${itemId}`, const_result).subscribe(res => {
    //   this._data.showUpdateSuccess(const_result.tablenumber);
    // });
    // this.order?.data?.orderDetails.forEach((element: any) => {
    //   this._data.put(this.API_Order_Detail + `/${element.id}`, element).subscribe(res => {
    //     this._data.showUpdateSuccess(const_result.tablenumber);
    //   });
    // });
  }

  downloadInvoice(form: any) {

    this.updateStatusThanhToan(form);

    this.showPayment = true;
    // setTimeout(() => {
    //   this.content = document.getElementById('PrintInvoice')!.innerHTML;
    //   let options = {
    //     documentSize: 'A4',
    //     type: 'share',
    //     // landscape: 'portrait',
    //     fileName: 'Order-Invoice.pdf'
    //   };
    //   this.pdfGenerator.fromData(this.content, options)
    //     .then((base64) => {
    //       console.log('OK', base64);
    //     }).catch((error) => {
    //       console.log('error', error);
    //     });
    // }, 700);

  }

  async openQuenstion(form: any) {
    const modal = await this.modalCtrl.create({
      component: ModalDetailsPaymentYesnoComponent,
      componentProps: {
        // data: this.order?.data?.orderDetails
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();


    if (role === 'TT') {
      this.statusPrint = 'TT';
      this.updateStatusThanhToan(form);
      setTimeout(() => {
        this.loaddata();
      }, 1000);
      // this.downloadInvoice(form)
    } else if (role === 'DRAF') {
      this.statusPrint = 'TT';
      this.editForm(form);
      setTimeout(() => {
        this.loaddata();
      }, 1000);
    }
  }

  async showBillModal() {
    const modal = await this.modalCtrl.create({
      component: ShowBillComponent,
      componentProps: {
        data: this.order?.data
      },
      backdropDismiss: false
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {

    }
  }
  async showBillWebModal() {
    const modal = await this.modalCtrl.create({
      component: ShowBillWebComponent,
      componentProps: {
        data: this.order?.data
      },
      backdropDismiss: false
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {

    }
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
