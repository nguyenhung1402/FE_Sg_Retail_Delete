import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { home } from 'src/app/services/link-id.index';
import { IonModal, ModalController, NavController, AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { DateRange } from '@angular/material/datepicker';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.page.html',
  styleUrls: ['./history-details.page.scss'],
})
export class HistoryDetailsPage implements OnInit {
  public history: any;
  currentUser: any = {};
  formGroup!: FormGroup;
  valueForm: any = '';
  dynamictype: string = "number";
  API: string = '/pos';
  Loading = true;
  values: any

  constructor(private route: ActivatedRoute,
    private _data: DataService, private modalCtrl: ModalController,
    private formBuilder: FormBuilder, private navCtrl: NavController,
    private authService: AuthService ) { }

  ngOnInit() {
    this.currentUser = this.authService.getParseTokenUser();
    this.loaddata();
    this.createForm();
  }

  loaddata() {
    this.Loading = false;
    this.createForm();
    const itemId = +this.route.snapshot.params['id'];
    if (itemId != null || itemId != undefined) {
      this._data.get(this.currentUser.ip + this.API + `/${itemId}`).subscribe(x => {
        this.history = x || [];
        this.setValue(this.history?.data);
        this.Loading = true;
      }, (error) => {
        this.Loading = true;
      });
    } else {
      this.Loading = true;
    }

  }



  setValue(values: any) {

    const today = new Date(values.docDate);
    const yyyy = today.getFullYear();
    var mm: any = today.getMonth() + 1; // Months start at 0!
    var dd: any = today.getDate();

    if (dd < 10) dd = '0' + dd.toString();
    if (mm < 10) mm = '0' + mm.toString();

    const formattedToday = dd + '/' + mm + '/' + yyyy

    this.formGroup.controls["poscode"].setValue(values.poscode);
    this.formGroup.controls["poscode"].disable();
    this.formGroup.controls["docdate"].setValue(formattedToday);
    this.formGroup.controls["total"].setValue(values.total.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    this.formGroup.controls["discount"].setValue(
      ((
        Number(values.total)
        *
        Number(values.discout)
      ) / 100)

        .toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
    this.formGroup.controls["doctotal"].setValue(values.doctotal.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    this.formGroup.controls["customerpay"].setValue(values.customerpay.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    this.formGroup.controls["refund"].setValue(values.refund.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","))

    this.formGroup.controls["doctotal"].disable();
    this.formGroup.controls["refund"].disable();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'poscode': [null, Validators.required],
      'docdate': [new Date().toDateString()],
      'total': [0, Validators.required],
      'discount': [0],
      'doctotal': [0, Validators.required],
      'customerpay': [0, Validators.required],
      'refund': [0, Validators.required]
    });
  }

  editForm() {
    this.formGroup.controls["poscode"].setValue(this.history?.poscode);
    this.formGroup.controls["docdate"].setValue(this.history?.docDate);
    this.formGroup.controls["total"].setValue(this.history?.total);
    this.formGroup.controls["discount"].setValue(this.history?.discount);
    this.formGroup.controls["doctotal"].setValue(this.history?.doctotal);
    this.formGroup.controls["customerpay"].setValue(this.history?.customerpay)
    this.formGroup.controls["refund"].setValue(this.history?.refund)

  }

  UpdateItem(values: any) {
    const itemId = +this.route.snapshot.params['id'];
    var const_update = {}

    const today = new Date(values.docdate);

    var st = values.docdate;
    st = st.replaceAll("/", ".");

    var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    var dt = new Date(st.replace(pattern, '$3-$2-$1'));
    values.docDate = dt;
    values.docdate = dt;

    values.discount = Number(values.discount.replace(/,/g, ""));
    values.total = Number(values.total.replace(/,/g, ""));
    values.doctotal = Number(values.doctotal.replace(/,/g, ""));
    values.refund = Number(values.refund.replace(/,/g, ""));
    this._data.put(this.currentUser.ip + this.API + `/${itemId}`, values).subscribe((res: any) => {
      this._data.showUpdateSuccess(values.poscode);
    })
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  // public openItem(itemId: number): void {
  //   this.navCtrl.navigateForward([home.history, itemId]);
  // }

}
