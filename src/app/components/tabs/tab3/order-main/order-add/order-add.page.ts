import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { IonModal, ModalController } from '@ionic/angular';
import { UrlConstants } from 'src/app/commons/UrlConstants';
import { DataService } from 'src/app/services/data.service';
import { OrderItemsComponent } from '../../order-items/order-items.component';
import { TableComponent } from '../../table/table.component';
import { OverlayEventDetail } from '@ionic/core/components';
import { Location } from "@angular/common";
import { map, Observable, startWith } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ModalDetailsPaymentYesnoComponent } from '../order-details/modal-details-payment-yesno/modal-details-payment-yesno.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.page.html',
  styleUrls: ['./order-add.page.scss'],
})
export class OrderAddPage implements OnInit {
  @ViewChild('valuesinput') valuesinput: any;
  // Available
  Loading = true;
  product_price: any;
  formGroup!: FormGroup;
  formGroup1!: FormGroup;
  nowDate = new Date();
  totalValues = 0;
  totalSum = 0;
  change = 0;
  discount = 0;
  product_num = 0;
  send = 0;
  product = '';
  // Object
  const_table: any = {};
  order_details: any = [];
  warehouse: any = {};
  const_bp: any = {};
  const_staff: any = {};
  _nxt: any = {};
  const_data: any = {};
  currentUser: any = {};
  // API
  API_Table: string = '/table';
  API_WAREHOUSE: string = '/warehouse';
  API_NXT_WhsItem: string = '/viewnxt/whsitem';
  API_Order: string = '/order';
  API_BP: string = '/business';
  API_Staff: string = '/staff';
  BASE_SERVERS: any = UrlConstants.BASE_SERVER + '/';
  imgDefault = '../../../../../../assets/images/imgdefault.jpeg';
  statusPrint: string = '';

  // autocomplete cardcode
  myControlCardCode = new FormControl('');
  myControlStaffCode = new FormControl('');
  filteredOptionsCardCode: Observable<any[]> | undefined;
  filteredOptionsStaffCode: Observable<any[]> | undefined;


  constructor(
    private _data: DataService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private location: Location,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.getParseTokenUser();
    this.loadDataTable();
    this.loadDataWarehouse();
  }


  ngOnInit(): void {
    this.loaddata_bp();
    this.loaddata_staff();
    this.createForm1();
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'tablename': [null],
      'tablenumber': [null, Validators.required],
      'docdate': [Date],
      'remarks': [null],
      'group': [null],
      'phone': [0],
      'total': [0],
      'discount': [0],
      'doctotal': [0],
      'customerpay': [0],
      'refund': [0],
      'vat': [0],
      'creator': [null],
    });
    // this.formGroup.controls['postingdate'].disable();
  }
  createForm1() {
    this.formGroup1 = this.formBuilder.group({
      'cardcode': [null],
      'cardname': [null],
      'staffcode': [null],
      'staffname': [null],
    });
    this.formGroup1.controls['cardname'].disable();
    this.formGroup1.controls['staffname'].disable();
  }

  loadDataTable() {
    this.Loading = false;
    const itemId = +this.route.snapshot.params['id'];
    this._data.get(this.currentUser.ip + this.API_Table + `/${itemId}`).subscribe(x => {
      // this.const_table = x || [];
      this.setTableInObj(x || []);
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
      console.log(error);
    });
  }

  setTableInObj(data: any) {
    this.const_table = data?.data;
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
    console.log(this.const_bp);
  }
  loaddata_staff() {
    this.Loading = false;
    this._data.get(this.currentUser.ip + this.API_Staff).subscribe(x => {
      // this.const_bp = x || [];
      this.setDataStaff(x || []);
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
      console.log(error);
    });

  }
  setDataStaff(data: any) {
    this.const_staff = data;
    this.autocompateStaffCode();
    console.log(this.const_staff);
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

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: OrderItemsComponent,
      componentProps: {
        data: this.order_details
      },
      backdropDismiss: false
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.order_details = data;
    }

    this.totalValues = 0;
    this.order_details.forEach((element: any) => {
      this.totalValues = this.totalValues + (element.quantity * element.price)
      this.totalSum = this.totalValues
    });
  }

  total(event1: any, quantity: any, itemcode: any) {
    this.totalValues = 0;
    this.order_details.forEach((element: any) => {
      if (element.itemcode === itemcode) {
        element.quantity = Number(quantity);
        this.discountTotal(0);
        this.discountTotal('');
      }
      this.totalValues = this.totalValues + (element.quantity * element.price)
      this.totalSum = this.totalValues
    });

  }

  changeWhsCode(event: any, itemcode: any) {
    this._data.post(this.currentUser.ip + this.API_NXT_WhsItem, { WhsCode: event.srcElement.value, ItemCode: itemcode }).subscribe(x => {
      this.setValueNXT(x || []);
    })

    setTimeout(() => {
      this.order_details.forEach((element: any) => {
        if (element.itemcode === itemcode) {
          element.whscode = event.srcElement.value;
          element.ton = this._nxt.quantity == '' || this._nxt.quantity == null || this._nxt.quantity == undefined ? 0 : this._nxt.quantity;
          // if (this._nxt.quantity != '' || this._nxt.quantity != null || this._nxt.quantity != undefined) {
          //   if (Number(this._nxt.quantity) <= 0) {
          //     element.class = 'card-iten-darkgray'
          //   } else {
          //     element.class = 'card-iten-white'
          //   }
          // } else {
          //   element.class = 'card-iten-darkgray'
          // }
        }
      });
    }, 1000);
  }

  setValueNXT(data: any) {
    this._nxt = data?.data;
  }

  discountTotal(event: any) {
    if (event == 0) {
      this.totalSum = this.totalValues
    } else {
      this.order_details.forEach((element: any) => {
        this.totalSum = this.totalValues - (this.totalValues * (event.srcElement.value / 100))
      });
    }
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


  receiptTotal() {
    this.product = this.product_price.replace(/,/g, "");
    this.product_num = Number(this.product);
    if (this.product_num == 0) {
      this.totalSum = this.totalValues
    }
    else {
      this.order_details.forEach((element: any) => {
        this.send = this.product_num - this.totalSum
      });
    }
  }


  confirm(tablename: any, tablenumber: any, totalValues = 0, discount = 0, totalSum = 0, product_price: any, send = 0, form: any) {
    this.const_data = {};
    this.const_data.tablename = this.const_table.tablename;
    this.const_data.tablenumber = this.const_table.tablenumber;
    this.const_data.docDate = this.nowDate;
    this.const_data.remarks = form.remarks;
    this.const_data.cardcode = this.myControlCardCode.value;
    this.const_data.cardname = this.formGroup1.getRawValue().cardname;
    this.const_data.staffcode = this.myControlStaffCode.value;
    this.const_data.staffname = this.formGroup1.getRawValue().staffname;

    this.const_data.total = totalValues == undefined || totalValues == null ? 0 : Number(totalValues.toString().replace(/,/g, ""));
    this.const_data.discount = discount == null || discount == undefined ? 0 : Number(discount);

    this.const_data.doctotal = totalSum == null || totalSum == undefined ? 0 : Number(totalSum.toString().replace(/,/g, ""));

    if(this.statusPrint == 'TT') {
      if(this.const_data.discount == 0) {
        this.const_data.customerpay = this.const_data.doctotal.toString();
      } else {
        this.const_data.customerpay = product_price == null || product_price == undefined ? '0' : Number(product_price.replace(/,/g, "")).toString();
      }
    }

    // this.const_data.customerpay = product_price == null || product_price == undefined ? '0' : Number(product_price.replace(/,/g, "")).toString();
    this.const_data.refund = send == null || send == undefined ? 0 : Number(send.toString().replace(/,/g, ""));
    this.const_data.viewpayment = 'save'
    this.const_data.orderDetails = this.order_details;
    console.log(this.const_data);
    console.log(this.myControlStaffCode.value);
    console.log(this.formGroup1.getRawValue().staffname);
    this._data.post(this.currentUser.ip + this.API_Order, this.const_data).subscribe(res => {
      this._data.showSaveSuccess();
    });
    this.order_details = [];
    // this.mapTableToData();

    this.location.back();
  }

  updateStatusThanhToan(tablename: any, tablenumber: any, totalValues = 0, discount = 0, totalSum = 0, product_price: any, send = 0, form: any) {
    this.const_data = {};
    this.const_data.tablename = this.const_table.tablename;
    this.const_data.tablenumber = this.const_table.tablenumber;
    this.const_data.docDate = this.nowDate;
    this.const_data.remarks = form.remarks;
    this.const_data.cardcode = this.myControlCardCode.value;
    this.const_data.cardname = this.formGroup1.getRawValue().cardname;
    this.const_data.staffcode = this.myControlStaffCode.value;
    this.const_data.staffname = this.formGroup1.getRawValue().staffname;
    this.const_data.total = totalValues == undefined || totalValues == null ? 0 : Number(totalValues.toString().replace(/,/g, ""));
    this.const_data.discount = discount == null || discount == undefined ? 0 : Number(discount);

    this.const_data.doctotal = totalSum == null || totalSum == undefined ? 0 : Number(totalSum.toString().replace(/,/g, ""));
    // if (this.product_price == 0 || this.product_price == null || this.product_price == undefined) {
    //   this.const_data.customerpay = this.const_data.doctotal.toString();
    // } else {
    //   this.const_data.customerpay = product_price == null || product_price == undefined ? '0' : Number(product_price.replace(/,/g, "")).toString();
    // }
    if(this.statusPrint == 'TT') {
      if(this.const_data.discount == 0) {
        this.const_data.customerpay = this.const_data.doctotal.toString();
      } else {
        this.const_data.customerpay = product_price == null || product_price == undefined ? '0' : Number(product_price.replace(/,/g, "")).toString();
      }
    }
    this.const_data.refund = send == null || send == undefined ? 0 : Number(send.toString().replace(/,/g, ""));
    this.const_data.viewpayment = 'off'
    this.const_data.orderDetails = this.order_details;
    console.log(this.myControlCardCode.value);
    console.log(this.formGroup1.getRawValue().cardname);
    console.log(this.myControlStaffCode.value);
    console.log(this.formGroup1.getRawValue().staffname);
    this._data.post(this.currentUser.ip + this.API_Order, this.const_data).subscribe(res => {
      this._data.showSaveSuccess();
    });
    this.order_details = [];
    // this.mapTableToData();

    this.location.back();
  }

  async openQuenstion(tablename: any, tablenumber: any, totalValues = 0, discount = 0, totalSum = 0, product_price: any, send = 0, form: any) {
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
      this.updateStatusThanhToan(tablename, tablenumber, totalValues, discount, totalSum, product_price, send, form);
      // this.downloadInvoice(form)
    } else if (role === 'DRAF') {
      this.statusPrint = 'TT';
      this.confirm(tablename, tablenumber, totalValues, discount, totalSum, product_price, send, form);
    }
  }

  autocompateCardCode() {
    this.filteredOptionsCardCode = this.myControlCardCode.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filterCardCode(state) : this.const_bp.data.slice())),
    );
    console.log(this.filteredOptionsCardCode);
    console.log(this.const_bp.data);
  }
  autocompateStaffCode() {
    this.filteredOptionsStaffCode = this.myControlStaffCode.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filterStaffCode(state) : this.const_staff.data.slice())),
    );
   
  }
  private _filterCardCode(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.const_bp.data.filter((state: any) => state.cardname.toLowerCase().includes(filterValue));
  }
  private _filterStaffCode(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.const_staff.data.filter((state: any) => state.staffname.toLowerCase().includes(filterValue));
  }
  onSelectionChange($event: any) {
    const result = this.const_bp.data.find((x: any) => {
      return x.cardcode === $event.option.value
    })
    this.formGroup1.controls["cardname"].setValue(result?.cardname);
    this.formGroup1.controls['cardname'].disable();
  }
  onSelectionChangeStaff($event: any) {
    const result = this.const_staff.data.find((x: any) => {
      return x.staffcode === $event.option.value
    })
    this.formGroup1.controls["staffname"].setValue(result?.staffname);
    this.formGroup1.controls['staffname'].disable();
  }



  // @ViewChild(IonModal) modal!: IonModal;
  // @ViewChild('valuesinput') valuesinput!: { value: any; };
  // formGroup!: FormGroup;

  // Loading = true;
  // nowDate = new Date();
  // totalValues = 0;
  // totalSum = 0;
  // change = 0;
  // discount = 0;
  // send = 0;
  // quantity = 1;
  // product_price: any;
  // Order: any;

  // API_WAREHOUSE: string = '/warehouse';
  // API_Table: string = '/table';
  // API_NXT_WhsItem: string = '/viewnxt/whsitem';
  // API_Order: string = '/order';
  // BASE_SERVERS: any = UrlConstants.BASE_SERVER + '/';


  // warehouse: any = {};
  // const_data: any = {};
  // item_table: any = {};
  // order: any = {};
  // _nxt: any = {};
  // order_details: any = [];
  // Table: any;
  // content: any;


  // constructor(
  //   private _data: DataService,
  //   private formBuilder: FormBuilder,
  //   private modalCtrl: ModalController,
  //   private pdfGenerator: PDFGenerator,
  //   private location: Location
  // ) { }

  // ngOnInit() {
  //   this.createForm();
  //   this.formGroup.reset();
  //   this.loadDataTable();
  //   // this.loadData();
  //   this.loadDataWarehouse();
  // }

  // createForm() {
  //   this.formGroup = this.formBuilder.group({
  //     'tablename': [null],
  //     'tablenumber': [null, Validators.required],
  //     'docdate': [Date],
  //     'remarks': [null],
  //     'group': [null],
  //     // 'status': [null],
  //     'phone': [0],
  //     'total': [0],
  //     'discount': [0],
  //     'doctotal': [0],
  //     'customerpay': [0],
  //     'refund': [0],
  //     'vat': [0],
  //     'creator': [null]
  //   });
  //   // this.formGroup.controls['postingdate'].disable();
  // }

  // loadDataWarehouse() {
  //   this.Loading = false;
  //   this._data.get(this.API_WAREHOUSE).subscribe(x => {
  //     this.warehouse = x || [];
  //     this.Loading = true;
  //   }, (error) => {
  //     this.Loading = true;
  //     console.log(error);
  //   });
  // }

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

  // btnRefresh() {
  //   this.Loading = false;
  //   this._data.get(this.API_Order).subscribe(x => {
  //     this.Order = x || [];
  //     this.Loading = true;
  //   }, (error) => {
  //     this.Loading = true;
  //     console.log(error);
  //   });
  // }

  // confirm(tablename: any, tablenumber: any, totalValues = 0, discount = 0, totalSum = 0, product_price: any, send = 0, form: any) {
  //   this.const_data = {};
  //   this.const_data.tablename = tablename;
  //   this.const_data.tablenumber = tablenumber;
  //   this.const_data.docDate = this.nowDate;

  //   this.const_data.total = totalValues == undefined || totalValues == null ? 0 : Number(totalValues.toString().replace(/,/g, ""));
  //   this.const_data.discount = discount == null || discount == undefined ? 0 : Number(discount);

  //   this.const_data.doctotal = totalSum == null || totalSum == undefined ? 0 : Number(totalSum.toString().replace(/,/g, ""));
  //   this.const_data.customerpay = product_price == null || product_price == undefined ? '0' : Number(product_price.replace(/,/g, "")).toString();
  //   this.const_data.refund = send == null || send == undefined ? 0 : Number(send.toString().replace(/,/g, ""));
  //   // this.const_data.status = 'save';
  //   // this.const_data.status = form.status == '1' ? true : false;

  //   // this.const_data.cardCode = this.valuesinput.value;
  //   // this.const_data.cardName = this.formGroup.getRawValue().cardname;

  //   // this.const_data.type = 'T';
  //   this.const_data.orderDetails = this.order_details;

  //   this._data.post(this.API_Order, this.const_data).subscribe(res => {
  //     this._data.showSaveSuccess();
  //   });
  //   // this.modal.dismiss(this.name, 'confirm');
  //   this.order_details = [];
  //   // this.mapTableToData();
  //     this.location.back();
  // }

  // total(event1: any, quantity: any, itemcode: any) {
  //   this.totalValues = 0;
  //   this.order_details.forEach((element: any) => {
  //     if (element.itemcode === itemcode) {
  //       element.quantity = Number(quantity);
  //       this.discountTotal(0);
  //       this.discountTotal('');
  //     }
  //     this.totalValues = this.totalValues + (element.quantity * element.price)
  //     this.totalSum = this.totalValues
  //   });
  // }

  // changeWhsCode(event: any, itemcode: any) {
  //   this._data.post(this.API_NXT_WhsItem, { WhsCode: event.srcElement.value, ItemCode: itemcode }).subscribe(x => {
  //     this.setValueNXT(x || []);
  //   })
  //   console.log(this._nxt.quantity);

  //   setTimeout(() => {
  //     this.order_details.forEach((element: any) => {
  //       if (element.itemcode === itemcode) {
  //         element.whscode = event.srcElement.value;
  //         element.ton = this._nxt.quantity == '' || this._nxt.quantity == null || this._nxt.quantity == undefined ? 0 : this._nxt.quantity;
  //         if (this._nxt.quantity != '' || this._nxt.quantity != null || this._nxt.quantity != undefined) {
  //           if (Number(this._nxt.quantity) <= 0) {
  //             element.class = 'card-iten-darkgray'
  //           } else {
  //             element.class = 'card-iten-white'
  //           }
  //         } else {
  //           element.class = 'card-iten-darkgray'
  //         }
  //       }
  //     });
  //   }, 1000);
  // }

  // onWillDismiss(event: Event) {
  //   const ev = event as CustomEvent<OverlayEventDetail<string>>;

  //   if (ev.detail.role === 'confirm') {
  //     this.formGroup.reset();
  //   } else {
  //     this._data.showNotSuccess();
  //   }
  // }

  // clearOrderDetailAdd() {
  //   this.order_details = [];
  // }
  // getdata(value: any) {
  //   this.order = value || [];
  // }
  // onSubmit(values: any) {
  //   this.const_data.push(values);
  // }
  // async openModal() {
  //   this.loadDataWarehouse();
  //   const modal = await this.modalCtrl.create({
  //     component: OrderItemsComponent,
  //     componentProps: {
  //       data: this.order_details
  //     }
  //   });
  //   modal.present();

  //   const { data, role } = await modal.onWillDismiss();

  //   if (role === 'confirm') {
  //     this.order_details = data;
  //   }

  //   this.totalValues = 0;

  //   this.order_details.forEach((element: any) => {
  //     // this.totalValues = this.totalValues+(this.quantity *element.price)
  //     this.totalValues = this.totalValues + (this.quantity * element.price)
  //     // this.receiptTotal(0);
  //     this.discountTotal(0);
  //   });
  //   // this.formGroup.controls['postingdate'].disable();
  // }

  // setValueNXT(data: any) {
  //   this._nxt = data?.data;
  // }

  // CommaFormatted(event: any) {
  //   if (event.which >= 37 && event.which <= 40) return;

  //   if (this.product_price) {
  //     this.product_price = String(this.product_price);
  //     this.product_price = this.product_price.replace(/\D/g, "")
  //       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //   }
  // }


  // numberCheck(args: any) {
  //   if (args.key === 'e' || args.key === '+' || args.key === '-') {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
  // product = '';
  // product_num = 0;

  // receiptTotal() {
  //   this.product = this.product_price.replace(/,/g, "");
  //   this.product_num = Number(this.product);
  //   if (this.product_num == 0) {
  //     this.totalSum = this.totalValues
  //   }
  //   else {
  //     this.order_details.forEach((element: any) => {
  //       this.send = this.product_num - this.totalSum
  //     });
  //   }
  // }


  // discountTotal(event: any) {
  //   if (event == 0) {
  //     this.totalSum = this.totalValues
  //   } else {
  //     this.order_details.forEach((element: any) => {
  //       this.totalSum = this.totalValues - (this.totalValues * (event.srcElement.value / 100))
  //     });
  //   }
  // }

  // async openModalTable() {
  //   const modal = await this.modalCtrl.create({
  //     component: TableComponent,
  //     componentProps: {
  //       data: this.item_table
  //     }
  //   });
  //   modal.present();
  //   const { data, role } = await modal.onWillDismiss();
  //   if (role === 'confirm') {
  //     this.item_table = data;
  //     this.loadDataTable();
  //   }
  // }
  // downloadInvoice() {
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
  //   return this.modal.dismiss(null, 'cancel');
  // }

}
