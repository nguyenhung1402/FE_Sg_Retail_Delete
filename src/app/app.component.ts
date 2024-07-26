import { Component } from "@angular/core";

import { AndroidPermissions } from "@awesome-cordova-plugins/android-permissions/ngx";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(private _permissions: AndroidPermissions) {
    this.initializeApp();
  }

  initializeApp() {
    this._permissions
      .checkPermission(this._permissions.PERMISSION.INTERNET)
      .then(
        (result: any) =>
          console.log("Has permission INTERNET ?", result.hasPermission),
        (err: any) =>
          this._permissions.requestPermission(
            this._permissions.PERMISSION.INTERNET
          )
      );
    this._permissions.checkPermission(this._permissions.PERMISSION.CAMERA).then(
      (result: any) =>
        console.log("Has permission CAMERA ?", result.hasPermission),
      (err: any) =>
        this._permissions.requestPermission(this._permissions.PERMISSION.CAMERA)
    );
    this._permissions
      .checkPermission(this._permissions.PERMISSION.READ_EXTERNAL_STORAGE)
      .then(
        (result: any) =>
          console.log(
            "Has permission READ_EXTERNAL_STORAGE ?",
            result.hasPermission
          ),
        (err: any) =>
          this._permissions.requestPermission(
            this._permissions.PERMISSION.READ_EXTERNAL_STORAGE
          )
      );
    this._permissions
      .checkPermission(this._permissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
      .then(
        (result: any) =>
          console.log(
            "Has permission WRITE_EXTERNAL_STORAGE ?",
            result.hasPermission
          ),
        (err: any) =>
          this._permissions.requestPermission(
            this._permissions.PERMISSION.WRITE_EXTERNAL_STORAGE
          )
      );

    this._permissions.requestPermissions([
      this._permissions.PERMISSION.CAMERA,
      this._permissions.PERMISSION.INTERNET,
      this._permissions.PERMISSION.READ_EXTERNAL_STORAGE,
      this._permissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
      this._permissions.PERMISSION.GET_ACCOUNTS,
    ]);
  }
}
