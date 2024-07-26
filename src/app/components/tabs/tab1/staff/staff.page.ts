import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController} from '@ionic/angular';
import { home } from 'src/app/services/link-id.index';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.page.html',
  styleUrls: ['./staff.page.scss'],
})
export class staffPage implements OnInit {
  constructor(private _data: DataService,
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthService ) {
    this.currentUser = this.authService.getParseTokenUser();
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if(event.url == '/centers/tabs/tab1/staff/8') {
          this.loadData();
        }
      }
    });
  }
  API: string = '/staff';
  Loading = true;
  public staff: any;
  currentUser: any = {};

  filterTerm!: string;

  ngOnInit() {
    this.currentUser = this.authService.getParseTokenUser();
  }
  loadData() {
    this.Loading = false;
    this._data.get(this.currentUser.ip + this.API).subscribe(x => {
      this.staff = x || [];
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
      console.log(error);
    });
  }

  btnRefresh() {
    this.Loading = false;
    this._data.get(this.currentUser.ip + this.API).subscribe(x => {
      this.staff = x || [];
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
      console.log(error);
    });
  }

  public openItem(itemId: number): void {
    this.navCtrl.navigateForward([home.menuHome_staffParnet_Detail, itemId]);
  }

  public openAddItem(): void {
    this.navCtrl.navigateForward([home.menuHome_staffParnet_Add]);
  }
}
