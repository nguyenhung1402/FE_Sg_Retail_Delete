import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController, NavController,AlertController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core/components';
import { home } from 'src/app/services/link-id.index';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  const_data: any = [];
  public pos: any = {};
  currentUser: any = {};
  API: string = '/pos';
  Loading=true;
  formGroup!: FormGroup;



  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController,
    private _data: DataService,private formBuilder: FormBuilder,private authService: AuthService ) { }

  ngOnInit() {
    this.currentUser = this.authService.getParseTokenUser();
    this.loaddata();


  }
  public openItem(itemId: number): void {
    this.navCtrl.navigateForward([home.history, itemId]);
  }


  cancel() {
    return this.modal.dismiss(null, 'cancel');
  }

  // confirm() {
  //   this.modalCtrl.dismiss(this.checkedItems, 'confirm');
  // }
  // loadData() {
  //   this._data.getInvoiceData().subscribe(data => {
  //     this.const_data = data;
  //   });
  // }

    loaddata() {
    this.Loading = false;
    this._data.get(this.currentUser.ip + this.API).subscribe(x => {
      this.pos = x || [];
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
      console.log(error);
    });


  }

  btnRefresh(){
    this.Loading = false;
    this._data.get(this.currentUser.ip + this.API).subscribe(x => {
      this.pos = x || [];
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
      console.log(error);
    });
  }


  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      // this._data.showSaveSuccess();
      this.loaddata();
    } else {
      this._data.showNotSuccess();
    }
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'poscode': [null],
      'docdate': [new Date()],
      'total': [0],
      'discount': [0],
      'doctotal': [0],
      'customerpay': [0],
      'refund': [0],


    });
  }

}
