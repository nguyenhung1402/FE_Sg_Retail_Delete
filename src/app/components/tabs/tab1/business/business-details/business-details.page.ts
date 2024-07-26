import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.page.html',
  styleUrls: ['./business-details.page.scss'],
})
export class BusinessDetailsPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  public items: any;
  formGroup !: FormGroup;
  const_data: any = [];
  currentUser: any = {};
  valueForm: any = '';
  dynamictype: string = "number";
  API: string = '/business';
  Loading = true;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  constructor(
    private _data: DataService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService 
  ) { }

  ngOnInit() {
    // const itemId = +this.route.snapshot.params['id'];
    // this.items = this.dataService.getById_BusinessMaterData(itemId);
    // 
    // this.createForm();
    // this.editForm();
    this.currentUser = this.authService.getParseTokenUser();
    this.loaddata();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'cardcode': [null, Validators.required],
      'cardname': [null, Validators.required],
      'group': [null, Validators.required],
      'address': [null, Validators.required],
      'phone': [null, Validators.required],
      'status': [null, Validators.required]
    });
  }

  // loadData() {
  //   this._data.getBusinessMaterData().subscribe(data => {
  //     this.const_data = data;
  //   });
  // }

  loaddata() {
    this.Loading = false;
    this.createForm();
    const itemId = +this.route.snapshot.params['id'];
    if (itemId != null || itemId != undefined) {
      this._data.get(this.currentUser.ip + this.API + `/${itemId}`).subscribe(x => {
        this.items = x || [];
        this.setValue(this.items?.data);
        this.Loading = true;
      }, (error) => {
        this.Loading = true;
      });
    } else {
      this.Loading = true;
    }

  }

  setValue(values: any) {
    setTimeout(() => {
      this.Loading = false;
      this.formGroup.controls["cardcode"].setValue(values.group+values.cardcode);
      this.formGroup.controls["cardname"].setValue(values.cardname);
      this.formGroup.controls["group"].setValue(values.group);
      this.formGroup.controls["address"].setValue(values.address);
      this.formGroup.controls["phone"].setValue(values.phone);
      this.formGroup.controls["status"].setValue(values.status == true ? 'true' : 'false');

      this.formGroup.controls["cardcode"].disable();
    }, 1000);

    setTimeout(() => {
      this.Loading = true;
    }, 1000);
  }

  onSubmit(post: any) {
    this.valueForm = post;
  }

  // editForm() {
  //   this.formGroup.controls["cardcode"].setValue(this.items?.cardcode);
  //   this.formGroup.controls["cardname"].setValue(this.items?.cardname);
  //   this.formGroup.controls["group"].setValue(this.items?.group); 
  //   this.formGroup.controls["phone"].setValue(this.items?.phone);
  //   this.formGroup.controls["address"].setValue(this.items?.address);
  //   this.formGroup.controls["status"].setValue(this.items?.status)
  // }

  UpdateItem(values: any) {
    const itemId = +this.route.snapshot.params['id'];
    var const_update = {}
    values.status = values.status == 'true' ? true : false;

    this._data.put(this.currentUser.ip + this.API + `/${itemId}`, values).subscribe(res => {
      this._data.showUpdateSuccess(values.cardcode);
      this.loaddata();
    })
  }


  confirm(values: any) {
    this.modal.dismiss(this.name, 'confirm');

    this.onSubmit(values);
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

}
