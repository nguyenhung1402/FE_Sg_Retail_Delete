import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  credentials = {
    username: "",
    password: "",
  };
  API: string = "/Login";
  API_Items: string = "/Items";
  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private _data: DataService,
    private auth: AuthService
  ) {}

  ngOnInit() {}
  async login() {
    try {
      const res = await this.auth.login(this.credentials).toPromise();
      if (res) {
        this.router.navigateByUrl("/centers/tabs/tab1");
        //this.setCookiePage();
        //this.getItems_SAP();
        // await this.loginAPI_SAP();
      } else {
        this.presentAlert();
        // const alert = await this.alertCtrl.create({
        //   header: 'Login Failed',
        //   message: 'User credentials are incorrect',
        //   buttons: ['OK'],
        // });

        // await alert.present();
      }
    } catch {
      this.presentAlert();
    }
  }
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: "Notification",
      subHeader: "Login failed",
      message: "Incorrect username or password",
      buttons: ["OK"],
    });

    await alert.present();
  }
}
