import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { IonModal, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { home } from 'src/app/services/link-id.index';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.page.html',
  styleUrls: ['./bin.page.scss'],
})
export class BinPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  Loading = true;
  constructor(private _data: DataService,
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthService ) {
    this.currentUser = this.authService.getParseTokenUser();
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/centers/tabs/tab1/bin/4') {
          this.loadData();
        }
      }
    });
  }
  filterTerm!: string;
  API: string = '/table';
  public Warehouse: any;
  currentUser: any = {};
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.Loading = false;
    this._data.get(this.currentUser.ip + this.API).subscribe(x => {
      this.Warehouse = x || [];
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
      console.log(error);
    });
  }

  public openItem(itemId: number): void {
    this.navCtrl.navigateForward([home.menuHome_bin_details, itemId]);
  }

  public openAddItem(): void {
    this.navCtrl.navigateForward([home.menuHome_bin_add]);
  }
}

