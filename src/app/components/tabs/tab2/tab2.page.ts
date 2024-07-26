import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { home } from 'src/app/services/link-id.index';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  const_data: any = [];
  constructor(
    private _data: DataService,
    private navCtrl: NavController
  ) {
    this.loadData();
  }

  async loadData() {
    this._data.getListMenu().subscribe(res => {
      this.const_data = res || [];
    });
  }

  public openItem(itemId: number, url: any): void {
    this.navCtrl.navigateForward([url,itemId]);
  }
}
