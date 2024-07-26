import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { AlertController, IonModal, LoadingController, NavController } from '@ionic/angular';
import { UrlConstants } from 'src/app/commons/UrlConstants';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.scss'],
})
export class OrderItemsComponent implements OnInit {

  name: any;
  const_data: any = {};
  warehouse: any = {};
  checkedItems: any = {}
  currentUser: any = {};
  quantity = 1;
  data: any;
  API: string = '/items'
  API_WAREHOUSE: string = '/warehouse';
  Loading = true;
  public Item: any;
  filterTerm!: string;
  BASE_SERVERS: any = UrlConstants.BASE_SERVER + '/';

  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController,
    private _data: DataService, private authService: AuthService) {
    this.currentUser = this.authService.getParseTokenUser();
  }

  ngOnInit() {
    this.checkedItems = this.data || [];
    this.loadData();
      this.loadDataWarehouse();
  }

  loadData() {
    this.Loading = false;
    this._data.get(this.currentUser.ip + this.API).subscribe(x => {
      this.const_data = x || [];
      this.addItemInList(x || []);
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
      console.log(error);
    });
  }

  loadDataWarehouse() {
    this.Loading = false;
    this._data.get(this.currentUser.ip + this.API_WAREHOUSE).subscribe(x => {
      console.log(x);

      this.warehouse = x || [];
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
      console.log(error);
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalCtrl.dismiss(this.checkedItems, 'confirm');
  }

  addItemInList(values: any) {
    this.const_data = values;

    values?.data.forEach((element: any) => {
      element.checked = false;
      element.tax = 0;
    });

    setTimeout(async () => {
      await values?.data.forEach((element: any) => {
        this.checkedItems?.forEach((element1: any) => {
          if (element1.itemcode === element.itemcode) {
            element.checked = true;
            element.tax = 0;
          }
        });
      });
    }, 1000);
  }

  addlist(values: any) {
    const result = this.checkedItems?.find((x: any) => {
      return x.itemcode === values?.itemcode;
    });
    const resultIndex = this.checkedItems?.findIndex((x: any) => {
      return x.itemcode === values?.itemcode;
    });

    const const_result = this.const_data?.data.find((x: any) => {
      return x.itemcode === values?.itemcode;
    });

    if (result?.itemcode.toLowerCase() !== values?.itemcode.toLowerCase()) {
      // values.quantity = Number(valuesQuantity);
      this.checkedItems?.push(values);
      this.const_data?.data.forEach((element: any) => {
        this.checkedItems?.forEach((element1: any) => {
          if (element1.itemcode === element.itemcode) {
            element.checked = true;
            element.quantity = 1
            element.tax = 0;
            element.whscode = '01';
          }
        });
      });
    } else {
      this.checkedItems.splice(resultIndex, 1);
      this.const_data?.data.forEach((element: any) => {
        if (values.itemcode === element.itemcode) {
          element.checked = false;
          element.quantity = 1
          element.tax = 0;
          element.whscode = '01';
        }
      });
    }
  }
}
