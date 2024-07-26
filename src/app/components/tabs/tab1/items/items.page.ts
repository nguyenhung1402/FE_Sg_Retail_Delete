import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController, NavController, AlertController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { home } from 'src/app/services/link-id.index';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UrlConstants } from 'src/app/commons/UrlConstants';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  formGroup!: FormGroup;
  public Item: any;
  headerMenu = '';
  product_price = '';
  editForm = false;
  filterTerm!: string;
  API: string = '/items'
  Loading = true;
  BASE_SERVERS: any = UrlConstants.BASE_SERVER + '/';
  imgDefault = '../../../../../assets/images/imgdefault.jpeg';
  currentUser: any = {};


  constructor(private _data: DataService,
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.getParseTokenUser();
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if(event.url == '/centers/tabs/tab1/items/1') {
          this.loadData();
        }
      }
    });
  }

  ngOnInit() {
    this.currentUser = this.authService.getParseTokenUser();
  }

  loadData() {
    this.Loading = false;
    this._data.get(this.currentUser.ip + this.API).subscribe(x => {
      this.Item = x || [];
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
      console.log(error);
    });
  }
  btnRefresh() {
    this.Loading = false;
    this._data.get(this.currentUser.ip + this.API).subscribe(x => {
      this.Item = x || [];
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
      console.log(error);
    });
  }

  public openItem(itemId: number): void {
    this.navCtrl.navigateForward([home.menuHome_Items_Detail, itemId]);
  }

  public openAddItem(): void {
    this.navCtrl.navigateForward([home.menuHome_Items_Add]);
  }

}