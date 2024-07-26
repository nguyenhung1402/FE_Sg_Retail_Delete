import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { AlertController, IonModal, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

// import { FoodService } from 'src/app/service/food.service';
// import { DrinkService } from 'src/app/service/drink.service';



@Component({
  selector: 'app-goodsreceipt',
  templateUrl: './goodsreceipt.component.html',
  styleUrls: ['./goodsreceipt.component.scss'],
})
export class GoodsReceiptComponent implements OnInit {
  
  name: any;
  currentUser: any = {};
  const_data: any = [];
  checkedItems: any = [];
  quantity: any;
  data: any;
  foods:any;
  drinks:any;

  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController,
    private _data: DataService,
    private authService: AuthService 
    // private food: FoodService,
    // private drink: DrinkService
    ) { }
  ngOnInit() {
    this.currentUser = this.authService.getParseTokenUser();
    this.loadData();
    // this.loadDataFood();
    // this.loadDataDrink();

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
  loadData() {
    this._data.getItemMaterData().subscribe(data => {
      this.const_data = data || [];
      this.addItemInList(data || []);
      
    });
  }

  // loadDataFood() {
  //   this.food.getItemMaterData().subscribe(foods => {
  //     this.const_data = foods || [];
  //     // this.addItemInList(data || []);
  //    
  //   });
  // }

  // loadDataDrink() {
  //   this.drink.getItemMaterData().subscribe(drinks => {
  //     this.const_data = drinks || [];
  //     // this.addItemInList(data || []);
  //    
  //   });
  // }

  addItemInList(values: any) {
    
    this.const_data = values;
    
    values.forEach((element: any) => {
      element.checked = false;
    });

    
    setTimeout(async () => {
       await values.forEach((element: any) => {
        this.checkedItems.forEach((element1: any) => {
          if(element1.itemcode === element.itemcode){
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

    const const_result = this.const_data.find((x: any) => {
      return x.itemcode === values?.itemcode;
    });

    if (result?.itemcode.toLowerCase() !== values?.itemcode.toLowerCase()) {
      // values.quantity = Number(valuesQuantity);
      this.checkedItems.push(values);
      this.const_data.forEach((element: any) => {
        this.checkedItems.forEach((element1: any) => {
          if(element1.itemcode === element.itemcode){
            element.checked = true;
            element.quantity = 1
          }
        });
      });
    } else {
      this.checkedItems.splice(resultIndex, 1);
      this.const_data.forEach((element: any) => {
        if(values.itemcode === element.itemcode){
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
