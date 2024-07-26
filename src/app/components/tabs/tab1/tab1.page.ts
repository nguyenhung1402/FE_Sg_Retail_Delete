import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { home } from 'src/app/services/link-id.index';
import { ConfigAppComponent } from './config-app/config-app.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  const_data: any = [];
  currentUser: any = {};
  constructor(
    private _data: DataService,
    private navCtrl: NavController,
    private _authService: AuthService,
    private modalCtrl: ModalController
  ) {
    this.loadData();
    this.currentUser = this._authService.getParseTokenUser();
  }

  async loadData() {
    this._data.getListMenu().subscribe(res => {
      this.const_data = res || [];
    });
  }

  public openItem(itemId: number, url: any): void {
    this.navCtrl.navigateForward([url,itemId]);
  }
  logout() {
    this._authService.logout();
  };
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ConfigAppComponent,
      
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      
    }
  }
}
