import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { ModalController, NavController } from '@ionic/angular';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { home, order } from 'src/app/services/link-id.index';

@Component({
  selector: 'app-order-table-detail',
  templateUrl: './order-table-detail.page.html',
  styleUrls: ['./order-table-detail.page.scss'],
})
export class OrderTableDetailPage implements OnInit {

  // Object
  currentUser: any = {};
  const_table: any = {};
  const_listorder: any = {};
  const_listorder_notthanhtoan: any = {};
  // Avariable
  Loading = true;
  date = moment();
  years = '';
  dateCurrent = new Date();
  // API
  API_Table: string = '/table';
  API_ORDER_TALBENUMBER: string = '/order/tablenumber';
  API_ORDER_TALBENUMBER_NOTTHANHTOAN: string = '/order/allthanhtoan';

  constructor(
    private _data: DataService,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private pdfGenerator: PDFGenerator,
    private navCtrl: NavController,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    
    this.currentUser = this.authService.getParseTokenUser();
    this.router.events.subscribe((event: any) => {
      this.date = moment();
      // console.log(event.url.substring(0, 37));
      // this.years = this.date.format('YYYYMMDD');
      // console.log(event.url);
      if (event instanceof NavigationEnd) {
        if (event.url.substring(0, 37) == '/centers/tabs/tab3/order-table-detail') {
          // this.years = this.date.format('YYYYMMDD');
          this.loaddata();
          // this.loadlistdata_detailtable_chuathanhtoan();
        }
      }
    });
    this.loaddata();
    // this.loadlistdata_detailtable_chuathanhtoan();
  }

  ngOnInit() {
    this.currentUser = this.authService.getParseTokenUser();
this.years = this.date.format('YYYYMMDD');
      // console.log(event.url);
  }
  changeDate(event: any) {
    this.date = moment(event.value);
    this.years = this.date.format('YYYYMMDD');
    this.loaddata();
    // this.loadlistdata_detailtable_chuathanhtoan();
    // this.loaddata(days, months, years);
    // this.loaddataCircle(days, months, years);
  }

  loaddata() {
    this.Loading = false;
    const itemId = +this.route.snapshot.params['id'];
    if (itemId != null || itemId != undefined) {
      this._data.get(this.currentUser.ip + this.API_Table + `/${itemId}`).subscribe((x: any) => {
        this.setDataToObject(x || []);
      }, (error) => {
        this.Loading = true;
      });
    } else {
      this.Loading = true;
    }
  }

  setDataToObject(data: any) {
    this.const_table = data?.data;
    this.loadlistdata_detailtable(this.const_table?.tablenumber);
    this.loadlistdata_detailtable_chuathanhtoan(this.const_table?.tablenumber);
  }

  loadlistdata_detailtable(data: any) {
    this.Loading = false;
    this._data.post(this.currentUser.ip + this.API_ORDER_TALBENUMBER, { tablenumber: data, date: this.years }).subscribe(x => {
      this.setDataToObjcetList(x || []);
    }, (error) => {
      this.Loading = true;
    });
  }
  loadlistdata_detailtable_chuathanhtoan(data: any) {
    this.Loading = false;
    this._data.post(this.currentUser.ip + this.API_ORDER_TALBENUMBER_NOTTHANHTOAN, { tablenumber: data, date: this.years }).subscribe(x => {
      this.setDataToObjcetList_chuathanhtoan(x || []);
    }, (error) => {
      this.Loading = true;
    });
  }

  setDataToObjcetList(data: any) {

    
    console.log(this.const_listorder);
    this.const_listorder = data.data.sort((val1: any, val2: any)=> {
      const dateA = new Date(val1.docDate).getTime(); // Chuyển đổi docDate của 'a' thành thời gian số
      const dateB = new Date(val2.docDate).getTime(); // Chuyển đổi docDate của 'b' thành thời gian số
      return dateB - dateA;
    })
    

  }
  setDataToObjcetList_chuathanhtoan(data: any) {
    this.const_listorder_notthanhtoan =  data.data.sort((val1: any, val2: any)=> {
      const dateA = new Date(val1.docDate).getTime(); // Chuyển đổi docDate của 'a' thành thời gian số
      const dateB = new Date(val2.docDate).getTime(); // Chuyển đổi docDate của 'b' thành thời gian số
      return dateB - dateA;
    })
  }

  public openAddItem(): void {
    const itemId = +this.route.snapshot.params['id'];
    this.navCtrl.navigateForward([order.orderAdd, itemId]);
  }
  public openItem(itemId: number): void {
    this.navCtrl.navigateForward([home.order, itemId]);
  }
}
