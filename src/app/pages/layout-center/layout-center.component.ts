import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
// import { TranslateService } from '@ngx-translate/core';
// import { UrlConstants } from '../commons/UrlConstants';
import { AuthService } from 'src/app/services/auth.service';
// import { CookieService } from 'src/app/_services/cookie.service';
import { DataService } from 'src/app/services/data.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-layout-center',
  templateUrl: './layout-center.component.html',
  styleUrls: ['./layout-center.component.scss'],
})
export class LayoutCenterComponent implements OnInit {
  defaultValue: any = 1;
  translate_option: any[] = [
    { value: 1, viewValue: 'Tiếng việt' },
    { value: 2, viewValue: 'English' }
  ]
  public menuPages: any = {};
  const_data: any = {};
  API: string = '/menus';
  Loading = true;
  id!: string;
  currentUser: any = {};
  SLServer: any;

  constructor(private menuService: MenuService,
    private navCtrl: NavController,
    // private translate: TranslateService,
    private _data: DataService, private authService: AuthService) {
    // this.initializeApp();


  }
  ngOnInit() {
    this.currentUser = this.authService.getParseTokenUser();
    this.const_data = this.authService.getParseTokenUser();
    if (this.const_data.role == 'admin') { this.id = '1' }
    else if (this.const_data.role == 'manager') { this.id = '2' }
    else if (this.const_data.role == 'sale') { this.id = '3' }
    else if (this.const_data.role == 'purchase') { this.id = '4' }
    else if (this.const_data.role == 'customer') { this.id = '5' }
    else { this.id = '6' }
    // this.loaddata();
  }

  loaddata() {
    this.Loading = false;
    this._data.get(this.currentUser.ip + this.API + `/${this.id}`).subscribe(x => {
      this.menuPages = x || [];
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
      console.log(error);
    });
  }
  // initializeApp() {
  //   this.translate.setDefaultLang('vi');
  // }
  // onChange($event) {
  //   if ($event.value == 2) {
  //     this.translate.setDefaultLang('en');
  //   } else {
  //     this.translate.setDefaultLang('vi');
  //   }
  // }
  openItem() {
    this.navCtrl.navigateForward(["/centers/main"]);
  }

  /**
   * Logout
   */
  // logout() {
  //   this.authService.logout();
  //   this.cookie.deleteCookie('user_dong_nguyen');
  // }


  /**
     * Test connect Database SAP
     */
  // connectSL() {
  //   // this.loadSLServer('https://trum:50000/b1s/v1');
  //   var jData = JSON.stringify({ UserName: UrlConstants.USER_SAP, Password: UrlConstants.PASS_SAP, CompanyDB: UrlConstants.DATABASE_INTEGRATION });
  //   var ajax = {
  //     url: "https://trum:50000/b1s/v1/Login",
  //     xhrFields: {
  //       withCredentials: true
  //     },
  //     data: jData,
  //     type: "POST",
  //     dataType: "json"
  //   };

  //   this._data.postIntegration("/Login", {ajax}).subscribe(res => {
  //     this._data.showConnectSuccessIntegration();
  //   })
  // }
  // loadSLServer(inputServer) {
  //   if (inputServer.length - 1 == inputServer.lastIndexOf("/")) {
  //     this.SLServer = inputServer;
  //   }
  //   else {
  //     this.SLServer = inputServer + "/";
  //   }
  // }
}
