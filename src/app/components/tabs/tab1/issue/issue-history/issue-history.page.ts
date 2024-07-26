import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { issue } from 'src/app/services/link-id.index';

@Component({
  selector: 'app-issue-history',
  templateUrl: './issue-history.page.html',
  styleUrls: ['./issue-history.page.scss'],
})
export class IssueHistoryPage implements OnInit {
  const_data: any = {};
  currentUser: any = {};

  API: string = '/issue';

  Loading = true;
  filterTerm!: string;

  constructor(private _data: DataService, private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private navCtrl: NavController,private authService: AuthService ) { }

  ngOnInit() {
    this.currentUser = this.authService.getParseTokenUser();
    setTimeout(() => {
      this.loadData();
    }, 3000);
  }

  loadData() {
    this.Loading = false;
    this._data.get(this.currentUser.ip + this.API).subscribe(x => {
      this.const_data = x || [];
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
      console.log(error);
    });
  }

  openItem(itemId: any) {
    this.navCtrl.navigateForward([issue.issueDetail, itemId]);
    // this.cancel();
  }
  // cancel() {
  //   return this.modalCtrl.dismiss(null, 'cancel');
  // }

}
