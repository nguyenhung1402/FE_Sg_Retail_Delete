import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { AlertController, IonModal, LoadingController, NavController } from '@ionic/angular';

// import { FoodService } from 'src/app/service/food.service';
// import { DrinkService } from 'src/app/service/drink.service';

import { UrlConstants } from 'src/app/commons/UrlConstants';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pos-additems',
  templateUrl: './pos-additems.component.html',
  styleUrls: ['./pos-additems.component.scss'],
})
export class PosAdditemsComponent implements OnInit {

  name: any;
  // const_data: any = [];
  const_data: any = {};
  currentUser: any = {};
  checkedItems: any = [];
  quantity = 1;
  data: any;
  API: string = '/items'
  Loading = true;
  public Item: any;
  filterTerm!: string;

  BASE_SERVERS: any = UrlConstants.BASE_SERVER + '/';

  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController,
    private _data: DataService,
    private authService: AuthService
  ) { }
  ngOnInit() {
    this.currentUser = this.authService.getParseTokenUser();
    this.loadData();


    this.checkedItems = this.data;
  }
  public openItem(itemId: number): void {
    // this.showLoading();
    this.navCtrl.navigateForward(["tab2/pos-additems/pos-details", itemId]);
  }


  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalCtrl.dismiss(this.checkedItems, 'confirm');
  }

  // loadData() {
  //   this._data.getItemMaterData().subscribe(
  //     data => {
  //       this.const_data = data || [];
  //       this.addItemInList(data || []);

  //     }
  //   );
  // }

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



  addItemInList(values: any) {

    this.const_data = values;

    values?.data.forEach((element: any) => {
      element.checked = false;
      element.tax = 0;
    });


    setTimeout(async () => {
      await values?.data.forEach((element: any) => {
        this.checkedItems.forEach((element1: any) => {
          if (element1.itemcode === element.itemcode) {
            element.checked = true;
            element.tax = 0;
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
      // values.quantity = Number(valuesQuantity);
      this.checkedItems.push(values);
      this.const_data?.data.forEach((element: any) => {
        this.checkedItems.forEach((element1: any) => {
          if (element1.itemcode === element.itemcode) {
            element.checked = true;
            element.quantity = 1
            element.tax = 0;
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
        }
      });
    }

  }





  // addItemInList(values: any) {
  // 
  //   this.const_data = values;
  //   
  //   values.forEach((element: any) => {
  //     element.checked = false;
  //   });

  //   
  //   setTimeout(async () => {
  //      await values.forEach((element: any) => {
  //       this.checkedItems.forEach((element1: any) => {
  //         if(element1.itemcode === element.itemcode){
  //           element.checked = true;
  //         }
  //       });
  //     });
  //   }, 1000);
  //   
  // }


  // addlist(values: any) {
  //   
  //   const result = this.checkedItems.find((x: any) => {
  //     return x.itemcode === values?.itemcode;
  //   });
  //   const resultIndex = this.checkedItems.findIndex((x: any) => {
  //     return x.itemcode === values?.itemcode;
  //   });

  //   const const_result = this.const_data.find((x: any) => {
  //     return x.itemcode === values?.itemcode;
  //   });

  //   if (result?.itemcode.toLowerCase() !== values?.itemcode.toLowerCase()) {
  //     // values.quantity = Number(valuesQuantity);
  //     this.checkedItems.push(values);
  //     this.const_data.forEach((element: any) => {
  //       this.checkedItems.forEach((element1: any) => {
  //         if(element1.itemcode === element.itemcode){
  //           element.checked = true;
  //           element.quantity = 1
  //         }
  //       });
  //     });
  //   } else {
  //     this.checkedItems.splice(resultIndex, 1);
  //     this.const_data.forEach((element: any) => {
  //       if(values.itemcode === element.itemcode){
  //         element.checked = false;
  //         element.quantity = 1
  //       }
  //     });
  //   }
  //  
  // }

  // addItemInList(values: any) {
  //   this.const_data.forEach((element: any) => {
  //     element.checked = false;
  //   });

  //   
  //   setTimeout(async () => {
  //      await this.const_data.forEach((element: any) => {
  //       this.checkedItems.forEach((element1: any) => {
  //         if(element1.itemcode === element.itemcode){
  //           element.checked = true;
  //         }
  //       });
  //     });
  //   }, 1000);
  //   
  // }


  // addlist(values: any) {
  //   
  //   const result = this.checkedItems.find((x: any) => {
  //     return x.itemcode === values?.itemcode;
  //   });
  //   const resultIndex = this.checkedItems.findIndex((x: any) => {
  //     return x.itemcode === values?.itemcode;
  //   });

  //   const const_result = this.const_data.find((x: any) => {
  //     return x.itemcode === values?.itemcode;
  //   });


  //   if (result?.itemcode.toLowerCase() !== values?.itemcode.toLowerCase()) {
  //     // values.quantity = Number(valuesQuantity);
  //     this.checkedItems.push(values);
  //     this.const_data.forEach((element: any) => {
  //       this.checkedItems.forEach((element1: any) => {
  //         if(element1.itemcode === element.itemcode){
  //           element.checked = true;
  //         }
  //       });
  //     });
  //   } else {
  //     this.checkedItems.splice(resultIndex, 1);
  //     this.const_data.forEach((element: any) => {
  //       if(values.itemcode === element.itemcode){
  //         element.checked = false;
  //       }
  //     });
  //   }
  //   
  // }
}


