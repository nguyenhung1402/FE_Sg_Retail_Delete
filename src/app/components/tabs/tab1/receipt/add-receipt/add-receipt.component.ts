import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { AlertController, IonModal, LoadingController, NavController } from '@ionic/angular';
import { UrlConstants } from 'src/app/commons/UrlConstants';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-receipt',
  templateUrl: './add-receipt.component.html',
  styleUrls: ['./add-receipt.component.scss'],
})
export class AddReceiptComponent implements OnInit {

  Loading = true;
  name: any;
  const_data: any = {};
  checkedItems: any = {};
  const_temps: any = {};
  currentUser: any = {};
  quantity: any;
  data: any;
  foods: any;
  drinks: any;
  API: string = '/items';
  BASE_SERVERS: any = UrlConstants.BASE_SERVER + '/';
  imgDefault = '../../../../../assets/images/imgdefault.jpeg';
  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController,
    private _data: DataService,
    private authService: AuthService 
  ) { }
  ngOnInit() {
    this.checkedItems = this.data;
    this.currentUser = this.authService.getParseTokenUser();
    this.loadData();
  }
  public openItem(itemId: number): void {
    this.navCtrl.navigateForward(["tab2/pos-additems/pos-details", itemId]);
  }


  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.checkedItems, 'confirm');
  }
  loadData() {
    this.Loading = false;
    this._data.get(this.currentUser.ip + this.API).subscribe(x => {
      this.const_data = x || [];
      this.addItemInList(this.const_data?.data || []);
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
      console.log(error);
    });
    // this._data.getItemMaterData().subscribe(data => {
    //   this.const_data = data || [];
    //   this.addItemInList(data || []);
    // });
  }

  addItemInList(values: any) {
    // this.const_data = values;
    values.forEach((element: any) => {
      element.checked = false;
    });

    setTimeout(async () => {
      await this.const_data?.data.forEach((element: any) => {
        this.checkedItems.forEach((element1: any) => {
          if (element1.itemcode === element.itemcode) {
            element.checked = true;
          }
        });
      });
    }, 1000);
  }


  addlist(values: any) {
    const result = this.checkedItems.find((x: any) => {
      return x.itemcode === values?.itemcode;
    });
    const resultIndex = this.checkedItems.findIndex((x: any) => {
      return x.itemcode === values?.itemcode;
    });

    const const_result = this.const_data?.data.find((x: any) => {
      return x.itemcode === values?.itemcode;
    });

    if (result?.itemcode.toLowerCase() !== values?.itemcode.toLowerCase()) {
      this.checkedItems.push(values);
      this.const_data?.data.forEach((element: any) => {
        this.checkedItems.forEach((element1: any) => {
          if (element1.itemcode === element.itemcode) {
            element.checked = true;
            element.quantity = 1
          }
        });
      });
    } else {
      this.checkedItems.splice(resultIndex, 1);
      this.const_data?.data.forEach((element: any) => {
        if (values.itemcode === element.itemcode) {
          element.checked = false;
          element.quantity = 1
        }
      });
    }
  }





  // this.checkedItems.forEach((element: any) => {
  //   if(element.itemcode == value.itemcode) {
  //     this.checkedItems.s
  //   } else {
  //     this.checkedItems.push(value)
  //   }
  // });


}
